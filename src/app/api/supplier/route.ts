import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createServiceClient } from '@/lib/supabase-server'
import { sendEmail } from '@/lib/email'

const supplierSchema = z.object({
  nama_bisnis: z.string().min(2, 'Nama bisnis harus diisi'),
  nama_pic: z.string().min(2, 'Nama PIC harus diisi'),
  whatsapp: z.string().min(9, 'Nomor WhatsApp harus diisi'),
  kota: z.string().min(2, 'Kota harus diisi'),
  produk: z.string().min(1, 'Pilih minimal satu produk'),
  kapasitas: z.string().optional(),
  moq: z.string().optional(),
  waktu_produksi: z.string().optional(),
  pengalaman: z.string().min(10, 'Ceritakan sedikit pengalaman Anda'),
})

export async function POST(request: NextRequest) {
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
      await sendEmail({
        to: adminEmail,
        subject: `[Sragam] Pendaftaran supplier baru: ${d.nama_bisnis} (${d.kota})`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
            <h2 style="color:#1e40af">Pendaftaran Supplier Baru</h2>
            <table style="border-collapse:collapse;width:100%;font-size:14px">
              <tr><td style="padding:6px 12px;background:#f3f4f6;font-weight:600">Nama Bisnis</td><td style="padding:6px 12px;border-bottom:1px solid #e5e7eb">${d.nama_bisnis}</td></tr>
              <tr><td style="padding:6px 12px;background:#f3f4f6;font-weight:600">PIC</td><td style="padding:6px 12px;border-bottom:1px solid #e5e7eb">${d.nama_pic}</td></tr>
              <tr><td style="padding:6px 12px;background:#f3f4f6;font-weight:600">WhatsApp</td><td style="padding:6px 12px;border-bottom:1px solid #e5e7eb"><a href="https://wa.me/${d.whatsapp}">${d.whatsapp}</a></td></tr>
              <tr><td style="padding:6px 12px;background:#f3f4f6;font-weight:600">Kota</td><td style="padding:6px 12px;border-bottom:1px solid #e5e7eb">${d.kota}</td></tr>
              <tr><td style="padding:6px 12px;background:#f3f4f6;font-weight:600">Produk</td><td style="padding:6px 12px;border-bottom:1px solid #e5e7eb">${d.produk}</td></tr>
              <tr><td style="padding:6px 12px;background:#f3f4f6;font-weight:600">Kapasitas/bulan</td><td style="padding:6px 12px;border-bottom:1px solid #e5e7eb">${d.kapasitas ?? '-'}</td></tr>
              <tr><td style="padding:6px 12px;background:#f3f4f6;font-weight:600">MOQ</td><td style="padding:6px 12px;border-bottom:1px solid #e5e7eb">${d.moq ?? '-'}</td></tr>
              <tr><td style="padding:6px 12px;background:#f3f4f6;font-weight:600">Waktu produksi</td><td style="padding:6px 12px;border-bottom:1px solid #e5e7eb">${d.waktu_produksi ?? '-'}</td></tr>
            </table>
            <h3 style="color:#374151;margin-top:20px">Pengalaman & Klien Sebelumnya</h3>
            <p style="color:#4b5563;font-size:14px;line-height:1.6;white-space:pre-wrap">${d.pengalaman}</p>
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
