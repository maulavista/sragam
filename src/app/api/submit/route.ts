import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createServiceClient, createSessionClient } from '@/lib/supabase-server'
import { sendEmail, escapeHtml } from '@/lib/email'

// CWE-93: strip newlines from any value used in email subjects
const safeForSubject = (s: string) => s.replace(/[\r\n]/g, ' ')

const orderItemSchema = z.object({
  jenis_seragam: z.string().min(1).max(100),
  jumlah: z.string().min(1).max(10),
  // CWE-400: cap number of size keys to prevent memory exhaustion
  ukuran: z.record(z.string().max(10), z.number().min(0).max(99999))
    .refine(obj => Object.keys(obj).length <= 20, 'Terlalu banyak ukuran')
    .optional(),
  bahan: z.string().max(100).optional(),
  metode_logo: z.string().max(100).optional(),
})

const orderSchema = z.object({
  // CWE-93: disallow newlines in fields used in email subjects
  nama: z.string().min(2, 'Nama harus diisi').max(100).regex(/^[^\r\n]*$/, 'Nama tidak valid'),
  // CWE-601: digits and + only for WhatsApp
  whatsapp: z.string().regex(/^[0-9+]{9,20}$/, 'Nomor WhatsApp tidak valid'),
  kota: z.string().min(2, 'Kota harus diisi').max(100).regex(/^[^\r\n]*$/, 'Kota tidak valid'),
  nama_organisasi: z.string().max(150).regex(/^[^\r\n]*$/, 'Nama organisasi tidak valid').optional(),
  jenis_organisasi: z.string().max(100).optional(),
  items: z.string().min(1, 'Produk harus dipilih'),
  anggaran: z.string().max(20).optional(),
  deadline: z.string().max(20).optional(),
  catatan: z.string().max(2000).optional(),
})

// CWE-345: reject requests from unexpected origins in production
function isValidOrigin(request: NextRequest): boolean {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  if (!siteUrl) return true // dev: no env var set, allow all
  const origin = request.headers.get('origin')
  if (!origin) return false // no origin header = not a browser request
  try {
    return new URL(origin).origin === new URL(siteUrl).origin
  } catch {
    return false
  }
}

export async function POST(request: NextRequest) {
  if (!isValidOrigin(request)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  try {
    const formData = await request.formData()

    const raw = {
      nama: formData.get('nama') as string,
      whatsapp: formData.get('whatsapp') as string,
      kota: formData.get('kota') as string,
      nama_organisasi: (formData.get('nama_organisasi') as string) || undefined,
      jenis_organisasi: (formData.get('jenis_organisasi') as string) || undefined,
      items: formData.get('items') as string,
      anggaran: (formData.get('anggaran') as string) || undefined,
      deadline: (formData.get('deadline') as string) || undefined,
      catatan: (formData.get('catatan') as string) || undefined,
    }

    const parsed = orderSchema.safeParse(raw)
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Data tidak valid', details: parsed.error.flatten() },
        { status: 400 }
      )
    }

    // Parse and validate items array
    let items: z.infer<typeof orderItemSchema>[]
    try {
      const rawItems = JSON.parse(parsed.data.items)
      if (!Array.isArray(rawItems) || rawItems.length === 0) {
        return NextResponse.json({ error: 'Minimal satu produk harus dipilih' }, { status: 400 })
      }
      if (rawItems.length > 20) {
        return NextResponse.json({ error: 'Maksimal 20 produk per pesanan' }, { status: 400 })
      }
      const parsedItems = rawItems.map((item: unknown) => orderItemSchema.safeParse(item))
      const invalid = parsedItems.find(r => !r.success)
      if (invalid) {
        return NextResponse.json({ error: 'Data produk tidak valid' }, { status: 400 })
      }
      items = parsedItems.map(r => (r as { success: true; data: z.infer<typeof orderItemSchema> }).data)
    } catch {
      return NextResponse.json({ error: 'Format produk tidak valid' }, { status: 400 })
    }

    const supabase = createServiceClient()

    // Get user from session (optional — orders can be submitted without an account)
    const sessionClient = createSessionClient()
    const { data: { user } } = await sessionClient.auth.getUser()

    // Handle optional file upload
    let desain_path: string | null = null
    const desainFile = formData.get('desain') as File | null

    // CWE-98: map extension → forced content type; never trust desainFile.type
    const ALLOWED_MIME_TYPES: Record<string, string> = {
      jpg: 'image/jpeg', jpeg: 'image/jpeg',
      png: 'image/png', webp: 'image/webp', pdf: 'application/pdf',
    }
    const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5 MB

    if (desainFile && desainFile.size > 0) {
      if (desainFile.size > MAX_FILE_SIZE) {
        return NextResponse.json({ error: 'File terlalu besar. Maksimal 5 MB.' }, { status: 400 })
      }
      const ext = (desainFile.name.split('.').pop() ?? '').toLowerCase()
      const forcedContentType = ALLOWED_MIME_TYPES[ext]
      if (!forcedContentType) {
        return NextResponse.json({ error: 'Format file tidak didukung. Gunakan JPG, PNG, atau PDF.' }, { status: 400 })
      }
      const safePath = `desain/${Date.now()}-${crypto.randomUUID()}.${ext}`
      const { error: uploadError } = await supabase.storage
        .from('order-designs')
        .upload(safePath, desainFile, { contentType: forcedContentType })
      if (!uploadError) desain_path = safePath
    }

    // Insert order
    const { data: order, error: dbError } = await supabase
      .from('orders')
      .insert({
        nama: parsed.data.nama,
        whatsapp: parsed.data.whatsapp,
        kota: parsed.data.kota,
        nama_organisasi: parsed.data.nama_organisasi ?? null,
        jenis_organisasi: parsed.data.jenis_organisasi ?? null,
        anggaran: parsed.data.anggaran ?? null,
        desain_path,
        deadline: parsed.data.deadline ?? null,
        catatan: parsed.data.catatan ?? null,
        status: 'baru',
        user_id: user?.id ?? null,
      })
      .select('id')
      .single()

    if (dbError) {
      console.error('DB insert error:', dbError)
      return NextResponse.json({ error: 'Gagal menyimpan data' }, { status: 500 })
    }

    // Insert order items
    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(
        items.map((item) => ({
          order_id: order.id,
          jenis_seragam: item.jenis_seragam,
          jumlah: parseInt(item.jumlah, 10),
          ukuran: item.ukuran && Object.keys(item.ukuran).length > 0 ? item.ukuran : null,
          bahan: item.bahan ?? null,
          metode_logo: item.metode_logo ?? null,
        }))
      )

    if (itemsError) {
      console.error('DB items insert error:', itemsError)
    }

    // Send email notifications only if items were successfully saved (CWE-703)
    if (process.env.BREVO_API_KEY && !itemsError) {
      const adminEmail = process.env.EMAIL_ADMIN

      const d = parsed.data
      const esc = escapeHtml

      const itemsTable = items.map((item, i) => `
        <tr style="background:${i % 2 === 0 ? '#f9fafb' : '#fff'}">
          <td style="padding:6px 12px;font-weight:600">${i + 1}</td>
          <td style="padding:6px 12px">${esc(item.jenis_seragam)}</td>
          <td style="padding:6px 12px">${esc(item.jumlah)} pcs</td>
          <td style="padding:6px 12px">${esc(item.bahan ?? 'Belum tahu')}</td>
          <td style="padding:6px 12px">${esc(item.metode_logo ?? 'Belum tahu')}</td>
        </tr>
      `).join('')

      const orderSummary = `
        <h3 style="color:#374151;margin-bottom:8px">Produk yang Dipesan</h3>
        <table style="border-collapse:collapse;width:100%;font-family:sans-serif;font-size:14px;margin-bottom:20px">
          <thead>
            <tr style="background:#e5e7eb">
              <th style="padding:6px 12px;text-align:left">#</th>
              <th style="padding:6px 12px;text-align:left">Produk</th>
              <th style="padding:6px 12px;text-align:left">Jumlah</th>
              <th style="padding:6px 12px;text-align:left">Bahan</th>
              <th style="padding:6px 12px;text-align:left">Logo</th>
            </tr>
          </thead>
          <tbody>${itemsTable}</tbody>
        </table>

        <h3 style="color:#374151;margin-bottom:8px">Detail Pesanan</h3>
        <table style="border-collapse:collapse;width:100%;font-family:sans-serif;font-size:14px">
          <tr><td style="padding:6px 12px;background:#f3f4f6;font-weight:600">Nama</td><td style="padding:6px 12px;border-bottom:1px solid #e5e7eb">${esc(d.nama)}</td></tr>
          <tr><td style="padding:6px 12px;background:#f3f4f6;font-weight:600">WhatsApp</td><td style="padding:6px 12px;border-bottom:1px solid #e5e7eb">${esc(d.whatsapp)}</td></tr>
          <tr><td style="padding:6px 12px;background:#f3f4f6;font-weight:600">Jenis Organisasi</td><td style="padding:6px 12px;border-bottom:1px solid #e5e7eb">${esc(d.jenis_organisasi ?? '-')}</td></tr>
          <tr><td style="padding:6px 12px;background:#f3f4f6;font-weight:600">Nama Organisasi</td><td style="padding:6px 12px;border-bottom:1px solid #e5e7eb">${esc(d.nama_organisasi ?? '-')}</td></tr>
          <tr><td style="padding:6px 12px;background:#f3f4f6;font-weight:600">Anggaran</td><td style="padding:6px 12px;border-bottom:1px solid #e5e7eb">${d.anggaran ? 'Rp ' + parseInt(d.anggaran).toLocaleString('id-ID') : 'Belum ada patokan'}</td></tr>
          <tr><td style="padding:6px 12px;background:#f3f4f6;font-weight:600">Deadline</td><td style="padding:6px 12px;border-bottom:1px solid #e5e7eb">${esc(d.deadline ?? '-')}</td></tr>
          <tr><td style="padding:6px 12px;background:#f3f4f6;font-weight:600">Catatan</td><td style="padding:6px 12px;border-bottom:1px solid #e5e7eb">${esc(d.catatan ?? '-')}</td></tr>
          <tr><td style="padding:6px 12px;background:#f3f4f6;font-weight:600">File Desain</td><td style="padding:6px 12px;border-bottom:1px solid #e5e7eb">${desain_path ? esc(desain_path) : 'Tidak ada'}</td></tr>
        </table>
      `

      const promises = []

      if (adminEmail) {
        const itemsSummary = items.map(i => `${i.jenis_seragam} ${i.jumlah} pcs`).join(', ')
        promises.push(
          sendEmail({
            to: adminEmail,
            // CWE-93: sanitize subject to prevent email header injection
            subject: `[Sragam] Permintaan baru: ${safeForSubject(itemsSummary)} - ${safeForSubject(d.nama)}`,
            html: `
              <div style="font-family:sans-serif;max-width:640px;margin:0 auto">
                <h2 style="color:#1e40af">Permintaan Seragam Baru</h2>
                <p style="color:#6b7280">Order ID: <code>${esc(order.id)}</code></p>
                ${orderSummary}
                <p style="margin-top:24px;color:#374151">
                  Hubungi pelanggan di WhatsApp: <a href="https://wa.me/${esc(d.whatsapp)}">${esc(d.whatsapp)}</a>
                </p>
              </div>
            `,
          })
        )
      }

      await Promise.allSettled(promises)

      await supabase
        .from('orders')
        .update({ email_sent: true })
        .eq('id', order.id)
    }

    return NextResponse.json({ success: true, orderId: order.id })
  } catch (err) {
    console.error('Submit handler error:', err)
    return NextResponse.json({ error: 'Terjadi kesalahan. Coba lagi.' }, { status: 500 })
  }
}
