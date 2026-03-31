import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createServiceClient } from '@/lib/supabase-server'
import { sendEmail, escapeHtml } from '@/lib/email'

// CWE-93: strip newlines from values used in email subjects
const safeForSubject = (s: string) => s.replace(/[\r\n]/g, ' ')

const supplierSchema = z.object({
  // CWE-93: disallow newlines in subject-bound fields
  nama_bisnis: z.string().min(2, 'Nama bisnis harus diisi').max(150).regex(/^[^\r\n]*$/, 'Nama bisnis tidak valid'),
  nama_pic: z.string().min(2, 'Nama PIC harus diisi').max(100).regex(/^[^\r\n]*$/, 'Nama PIC tidak valid'),
  // CWE-601: digits and + only
  whatsapp: z.string().regex(/^[0-9+]{9,20}$/, 'Nomor WhatsApp tidak valid'),
  kota: z.string().min(2, 'Kota harus diisi').max(100).regex(/^[^\r\n]*$/, 'Kota tidak valid'),
  produk: z.string().min(1, 'Pilih minimal satu produk').max(500),
  kapasitas: z.string().max(100).optional(),
  moq: z.string().max(100).optional(),
  waktu_produksi: z.string().max(100).optional(),
  pengalaman: z.string().min(10, 'Ceritakan sedikit pengalaman Anda').max(3000),
})

// CWE-345: reject requests from unexpected origins in production
function isValidOrigin(request: NextRequest): boolean {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  if (!siteUrl) return true
  const origin = request.headers.get('origin')
  if (!origin) return false
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
    const body = await request.json()
    const parsed = supplierSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Data tidak valid', details: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const d = parsed.data
    const supabase = createServiceClient()

    const { error: dbError } = await supabase
      .from('supplier_applications')
      .insert({
        nama_bisnis: d.nama_bisnis,
        nama_pic: d.nama_pic,
        whatsapp: d.whatsapp,
        kota: d.kota,
        produk: d.produk,
        kapasitas: d.kapasitas ?? null,
        moq: d.moq ?? null,
        waktu_produksi: d.waktu_produksi ?? null,
        pengalaman: d.pengalaman,
        status: 'baru',
      })

    if (dbError) {
      console.error('Supplier insert error:', dbError)
      return NextResponse.json({ error: 'Gagal menyimpan data' }, { status: 500 })
    }

    const adminEmail = process.env.EMAIL_ADMIN
    if (adminEmail) {
      const esc = escapeHtml
      await sendEmail({
        to: adminEmail,
        subject: `[Sragam] Pendaftaran supplier baru: ${safeForSubject(d.nama_bisnis)} (${safeForSubject(d.kota)})`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
            <h2 style="color:#1e40af">Pendaftaran Supplier Baru</h2>
            <table style="border-collapse:collapse;width:100%;font-size:14px">
              <tr><td style="padding:6px 12px;background:#f3f4f6;font-weight:600">Nama Bisnis</td><td style="padding:6px 12px;border-bottom:1px solid #e5e7eb">${esc(d.nama_bisnis)}</td></tr>
              <tr><td style="padding:6px 12px;background:#f3f4f6;font-weight:600">PIC</td><td style="padding:6px 12px;border-bottom:1px solid #e5e7eb">${esc(d.nama_pic)}</td></tr>
              <tr><td style="padding:6px 12px;background:#f3f4f6;font-weight:600">WhatsApp</td><td style="padding:6px 12px;border-bottom:1px solid #e5e7eb"><a href="https://wa.me/${esc(d.whatsapp)}">${esc(d.whatsapp)}</a></td></tr>
              <tr><td style="padding:6px 12px;background:#f3f4f6;font-weight:600">Kota</td><td style="padding:6px 12px;border-bottom:1px solid #e5e7eb">${esc(d.kota)}</td></tr>
              <tr><td style="padding:6px 12px;background:#f3f4f6;font-weight:600">Produk</td><td style="padding:6px 12px;border-bottom:1px solid #e5e7eb">${esc(d.produk)}</td></tr>
              <tr><td style="padding:6px 12px;background:#f3f4f6;font-weight:600">Kapasitas/bulan</td><td style="padding:6px 12px;border-bottom:1px solid #e5e7eb">${esc(d.kapasitas ?? '-')}</td></tr>
              <tr><td style="padding:6px 12px;background:#f3f4f6;font-weight:600">MOQ</td><td style="padding:6px 12px;border-bottom:1px solid #e5e7eb">${esc(d.moq ?? '-')}</td></tr>
              <tr><td style="padding:6px 12px;background:#f3f4f6;font-weight:600">Waktu produksi</td><td style="padding:6px 12px;border-bottom:1px solid #e5e7eb">${esc(d.waktu_produksi ?? '-')}</td></tr>
            </table>
            <h3 style="color:#374151;margin-top:20px">Pengalaman & Klien Sebelumnya</h3>
            <p style="color:#4b5563;font-size:14px;line-height:1.6;white-space:pre-wrap">${esc(d.pengalaman)}</p>
          </div>
        `,
      })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Supplier route error:', err)
    return NextResponse.json({ error: 'Terjadi kesalahan. Coba lagi.' }, { status: 500 })
  }
}
