'use client'

import { useState } from 'react'

const PRODUK_OPTIONS = [
  'Kaos / T-Shirt',
  'Polo Shirt',
  'Kemeja',
  'Jaket & Hoodie',
  'Rompi',
  'Celana & Rok',
  'Topi',
  'Jersey / Kaos Tim',
  'Blazer & Jas',
  'Wearpack / Coverall',
]

const KAPASITAS_OPTIONS = [
  'Di bawah 500 pcs/bulan',
  '500 – 2.000 pcs/bulan',
  '2.000 – 5.000 pcs/bulan',
  'Di atas 5.000 pcs/bulan',
]

const WAKTU_OPTIONS = [
  '3 – 5 hari kerja',
  '7 – 10 hari kerja',
  '10 – 14 hari kerja',
  'Di atas 14 hari kerja',
]

export default function SupplierForm() {
  const [form, setForm] = useState({
    nama_bisnis: '',
    nama_pic: '',
    whatsapp: '',
    kota: '',
    produk: [] as string[],
    kapasitas: '',
    moq: '',
    waktu_produksi: '',
    pengalaman: '',
  })
  const [error, setError] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const set = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
    setError(null)
  }

  const toggleProduk = (p: string) => {
    setForm(prev => ({
      ...prev,
      produk: prev.produk.includes(p)
        ? prev.produk.filter(x => x !== p)
        : [...prev.produk, p],
    }))
    setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.produk.length === 0) { setError('Pilih minimal satu produk.'); return }
    if (form.pengalaman.trim().length < 10) { setError('Ceritakan sedikit pengalaman Anda.'); return }

    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/supplier', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, produk: form.produk.join(', ') }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Terjadi kesalahan.')
      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan. Coba lagi.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-10">
        <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-7 h-7 text-green-600" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Pendaftaran diterima!</h3>
        <p className="text-gray-500 text-sm max-w-sm mx-auto">
          Kami akan meninjau informasi Anda dan menghubungi via WhatsApp kalau ada kecocokan.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">

      {/* Informasi dasar */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-4">Informasi bisnis</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="form-label">Nama bisnis / toko <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={form.nama_bisnis}
              onChange={e => set('nama_bisnis', e.target.value)}
              placeholder="Konveksi Maju Jaya"
              className="form-input"
              required
            />
          </div>
          <div>
            <label className="form-label">Nama PIC <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={form.nama_pic}
              onChange={e => set('nama_pic', e.target.value)}
              placeholder="Nama Anda"
              className="form-input"
              required
            />
          </div>
          <div>
            <label className="form-label">Nomor WhatsApp <span className="text-red-500">*</span></label>
            <input
              type="tel"
              value={form.whatsapp}
              onChange={e => set('whatsapp', e.target.value)}
              placeholder="08xxxxxxxxxx"
              inputMode="tel"
              className="form-input"
              required
            />
          </div>
          <div>
            <label className="form-label">Kota <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={form.kota}
              onChange={e => set('kota', e.target.value)}
              placeholder="Bandung"
              className="form-input"
              required
            />
          </div>
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* Kapabilitas */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-1">Kapabilitas produksi</h3>
        <p className="text-sm text-gray-500 mb-4">Pilih semua produk yang bisa Anda kerjakan.</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-6">
          {PRODUK_OPTIONS.map(p => (
            <button
              key={p}
              type="button"
              onClick={() => toggleProduk(p)}
              className={`text-left text-sm px-3 py-2.5 rounded-lg border transition-colors ${
                form.produk.includes(p)
                  ? 'bg-brand-50 border-brand-400 text-brand-700 font-medium'
                  : 'border-gray-200 text-gray-700 hover:border-gray-300'
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <label className="form-label">Kapasitas per bulan</label>
            <select value={form.kapasitas} onChange={e => set('kapasitas', e.target.value)} className="form-input">
              <option value="">Pilih kapasitas</option>
              {KAPASITAS_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <div>
            <label className="form-label">Minimum order (MOQ)</label>
            <input
              type="text"
              value={form.moq}
              onChange={e => set('moq', e.target.value)}
              placeholder="cth: 12 pcs per warna"
              className="form-input"
            />
          </div>
          <div>
            <label className="form-label">Estimasi waktu produksi</label>
            <select value={form.waktu_produksi} onChange={e => set('waktu_produksi', e.target.value)} className="form-input">
              <option value="">Pilih waktu</option>
              {WAKTU_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* Pengalaman */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-1">Pengalaman & klien sebelumnya</h3>
        <p className="text-sm text-gray-500 mb-3">
          Ceritakan proyek atau klien yang pernah Anda kerjakan. Ini akan digunakan sebagai referensi saat kami merekomendasikan Anda ke pembeli.
        </p>
        <textarea
          value={form.pengalaman}
          onChange={e => set('pengalaman', e.target.value)}
          rows={5}
          placeholder="cth: Pernah mengerjakan seragam untuk PLN (500 pcs polo), kaos event Telkom (1.200 pcs), dan seragam SMA Negeri 3 Jakarta selama 3 tahun berturut-turut."
          className="form-input resize-none"
          required
        />
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full sm:w-auto px-10"
      >
        {loading ? 'Mengirim...' : 'Kirim Pendaftaran'}
      </button>
    </form>
  )
}
