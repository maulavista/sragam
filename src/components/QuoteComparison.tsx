'use client'

import { useState } from 'react'

const summary = [
  { label: 'Jenis', value: 'Polo' },
  { label: 'Jumlah', value: '200 pcs' },
  { label: 'Bahan', value: 'Cotton Combed 30s' },
  { label: 'Logo', value: 'Sablon' },
  { label: 'Deadline', value: '10 hari kerja' },
]

type Label = {
  text: string
  color: string
  bg: string
  border: string
}

type Supplier = {
  name: string
  label: Label
  lokasi: string
  hargaPerPcs: string
  total: string
  bahan: string
  logo: string
  waktu: string
  catatan: string
  highlight: boolean
}

const suppliers: Supplier[] = [
  {
    name: 'Supplier A',
    label: { text: 'Termurah', color: 'text-green-700', bg: 'bg-green-50', border: 'border-green-200' },
    lokasi: 'Bandung',
    hargaPerPcs: 'Rp 68.000',
    total: 'Rp 13.600.000',
    bahan: 'Cotton Combed 30s campuran',
    logo: 'Sablon plastisol',
    waktu: '8 hari kerja',
    catatan: 'Lebih murah, tapi bahan campuran. Warna bisa sedikit berbeda dari ekspektasi.',
    highlight: false,
  },
  {
    name: 'Supplier B',
    label: { text: 'Rekomendasi', color: 'text-brand-700', bg: 'bg-brand-50', border: 'border-brand-200' },
    lokasi: 'Jakarta',
    hargaPerPcs: 'Rp 82.000',
    total: 'Rp 16.400.000',
    bahan: 'Cotton Combed 30s',
    logo: 'Sablon plastisol',
    waktu: '10 hari kerja',
    catatan: 'Sesuai spesifikasi permintaan. Harga dan waktu produksi seimbang.',
    highlight: true,
  },
  {
    name: 'Supplier C',
    label: { text: 'Kualitas Terbaik', color: 'text-purple-700', bg: 'bg-purple-50', border: 'border-purple-200' },
    lokasi: 'Surabaya',
    hargaPerPcs: 'Rp 95.000',
    total: 'Rp 19.000.000',
    bahan: 'Lacoste Premium',
    logo: 'Bordir',
    waktu: '12 hari kerja',
    catatan: 'Bordir lebih tahan lama dibanding sablon, cocok untuk seragam yang dipakai rutin.',
    highlight: false,
  },
]

export default function QuoteComparison() {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <section className="py-16 lg:py-20 bg-gray-50">
      <div className="section-container">
        <div className="text-center mb-10">
          <p className="text-brand-700 font-semibold text-sm uppercase tracking-wide mb-3">
            Contoh Tampilan
          </p>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Contoh Penawaran yang Akan Anda Terima
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto">
            Perbedaan harga, bahan, dan waktu produksi sudah tercantum. Anda tinggal pilih.
          </p>
        </div>

        {/* Summary card */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Ringkasan Kebutuhan Anda
            </p>
            <div className="flex flex-wrap gap-3">
              {summary.map((s) => (
                <div key={s.label} className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5">
                  <span className="text-xs text-gray-500">{s.label}:</span>
                  <span className="text-sm font-semibold text-gray-800">{s.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Supplier cards */}
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            {suppliers.map((s) => (
              <div
                key={s.name}
                className={`rounded-xl border-2 p-5 transition-all ${
                  s.highlight
                    ? 'border-brand-400 shadow-md shadow-brand-100'
                    : 'border-gray-200 bg-white'
                } ${selected === s.name ? 'ring-2 ring-brand-500' : ''}`}
              >
                {/* Label */}
                <span className={`inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full border mb-3 ${s.label.color} ${s.label.bg} ${s.label.border}`}>
                  {s.label.text === 'Rekomendasi' && (
                    <svg className="w-3 h-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  )}
                  {s.label.text}
                </span>

                <div className="flex items-center justify-between mb-0.5">
                  <p className="font-bold text-gray-900">{s.name}</p>
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {s.lokasi}
                  </span>
                </div>
                <p className="text-2xl font-extrabold text-gray-900 mb-1">{s.hargaPerPcs}<span className="text-sm font-normal text-gray-500">/pcs</span></p>
                <p className="text-xs text-gray-500 mb-4">Total: {s.total}</p>

                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Bahan</span>
                    <span className="text-gray-800 font-medium text-right max-w-28">{s.bahan}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Logo</span>
                    <span className="text-gray-800 font-medium">{s.logo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Produksi</span>
                    <span className="text-gray-800 font-medium">{s.waktu}</span>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <p className="text-xs text-gray-600 leading-relaxed italic">{s.catatan}</p>
                </div>

                {selected === s.name ? (
                  <div className="w-full bg-green-50 border border-green-300 text-green-700 font-semibold py-2 px-4 rounded-lg text-sm text-center">
                    Dipilih
                  </div>
                ) : (
                  <button
                    onClick={() => setSelected(s.name)}
                    className={`w-full font-semibold py-2 px-4 rounded-lg text-sm transition-colors ${
                      s.highlight
                        ? 'btn-primary'
                        : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Pilih Supplier Ini
                  </button>
                )}
              </div>
            ))}
          </div>

          {selected && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center animate-fade-in">
              <p className="text-green-800 font-medium">
                Anda memilih <strong>{selected}</strong>. Dalam tampilan nyata, Anda akan langsung dihubungkan untuk konfirmasi pesanan.
              </p>
            </div>
          )}

          <p className="text-center text-xs text-gray-400 mt-4">
            Ini adalah contoh tampilan. Data di atas bukan penawaran nyata.
          </p>
        </div>
      </div>
    </section>
  )
}
