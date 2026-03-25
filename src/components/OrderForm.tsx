'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

// ---- Types ----

type OrderItem = {
  jenis_seragam: string
  jumlah: string
  ukuran: Record<string, number>
  bahan: string
  metode_logo: string
}

type GlobalData = {
  jenis_organisasi: string
  anggaran: string
  deadline: string
  catatan: string
  nama: string
  whatsapp: string
  nama_organisasi: string
}

type Phase =
  | 'organisasi'
  | 'item-produk'
  | 'item-jumlah'
  | 'item-ukuran'
  | 'item-bahan'
  | 'item-logo'
  | 'item-review'
  | 'anggaran'
  | 'tenggat'
  | 'kontak'

// ---- Data ----

const ORGANISASI_OPTIONS = [
  { value: 'Perusahaan / Kantor', label: 'Perusahaan / Kantor' },
  { value: 'Sekolah / Kampus', label: 'Sekolah / Kampus' },
  { value: 'Tim Olahraga / Komunitas', label: 'Tim Olahraga / Komunitas' },
  { value: 'Organisasi / LSM', label: 'Organisasi / LSM' },
  { value: 'Event / Kepanitiaan', label: 'Event / Kepanitiaan' },
  { value: 'Keluarga / Pribadi', label: 'Keluarga / Pribadi' },
  { value: 'Lainnya', label: 'Lainnya' },
]

const PRODUK_BY_ORGANISASI: Record<string, string[]> = {
  'Perusahaan / Kantor': ['Polo Shirt', 'Kemeja', 'Jaket / Hoodie', 'Rompi', 'Kaos / T-Shirt', 'Celana / Rok', 'Blazer / Jas', 'Wearpack', 'Topi', 'Lainnya'],
  'Sekolah / Kampus': ['Seragam Identitas', 'Batik', 'Jaket / Blazer Almamater', 'Jersey / Olahraga', 'Kaos Kelas / Angkatan', 'Celana / Rok', 'Topi', 'Lainnya'],
  'Tim Olahraga / Komunitas': ['Jersey / Kaos Tim', 'Celana Olahraga', 'Jaket / Hoodie', 'Kaos / T-Shirt', 'Polo Shirt', 'Topi', 'Lainnya'],
  'Organisasi / LSM': ['Kaos / T-Shirt', 'Polo Shirt', 'Jaket / Hoodie', 'Rompi', 'Kemeja', 'Topi', 'Lainnya'],
  'Event / Kepanitiaan': ['Kaos / T-Shirt', 'Polo Shirt', 'Rompi', 'Jaket / Hoodie', 'Topi', 'Lainnya'],
  'Keluarga / Pribadi': ['Kaos / T-Shirt', 'Polo Shirt', 'Kemeja', 'Jaket / Hoodie', 'Topi', 'Lainnya'],
}

const PRODUK_FALLBACK = ['Kaos / T-Shirt', 'Polo Shirt', 'Kemeja', 'Jaket / Hoodie', 'Rompi', 'Celana / Rok', 'Topi', 'Jersey / Kaos Tim', 'Blazer / Jas', 'Wearpack', 'Lainnya']

type BahanOption = { value: string; label: string; desc: string }

const BELUM_TAHU: BahanOption = { value: '', label: 'Belum tahu', desc: 'Biarkan supplier yang menyarankan.' }
const LAINNYA_BAHAN: BahanOption = { value: 'Lainnya', label: 'Lainnya', desc: 'Ada bahan spesifik yang diinginkan.' }

const BAHAN_KAOS: BahanOption[] = [
  BELUM_TAHU,
  { value: 'Cotton Combed 30s', label: 'Cotton Combed 30s', desc: 'Lembut dan adem. Paling umum untuk kaos.' },
  { value: 'Cotton Combed 24s', label: 'Cotton Combed 24s', desc: 'Lebih tebal dari 30s. Cocok untuk kaos yang lebih berbobot.' },
  { value: 'CVC', label: 'CVC', desc: 'Campuran cotton dan polyester. Lebih awet dan tahan kerut.' },
  { value: 'Polyester / Dryfit', label: 'Polyester / Dryfit', desc: 'Ringan dan cepat kering. Cocok untuk kaos kasual atau event.' },
  LAINNYA_BAHAN,
]
const BAHAN_POLO: BahanOption[] = [
  BELUM_TAHU,
  { value: 'Lacoste', label: 'Lacoste', desc: 'Bertekstur rajut. Standar untuk polo shirt.' },
  { value: 'Pique', label: 'Pique', desc: 'Tekstur kotak-kotak halus. Tampilan lebih premium dari lacoste.' },
  { value: 'Waffle', label: 'Waffle', desc: 'Bertekstur seperti wafel. Lebih tebal, kesan sporty.' },
  { value: 'Cotton Combed 30s', label: 'Cotton Combed 30s', desc: 'Alternatif yang lebih ringan dan lembut.' },
  LAINNYA_BAHAN,
]
const BAHAN_KEMEJA: BahanOption[] = [
  BELUM_TAHU,
  { value: 'Drill', label: 'Drill', desc: 'Kuat dan rapi. Paling umum untuk kemeja kerja dan seragam.' },
  { value: 'Twill', label: 'Twill', desc: 'Lebih halus dari drill. Cocok untuk kemeja yang lebih formal.' },
  { value: 'Oxford', label: 'Oxford', desc: 'Tekstur halus berstruktur. Umum untuk kemeja kasual-formal.' },
  { value: 'Poplin', label: 'Poplin', desc: 'Tipis dan halus. Cocok untuk kemeja formal dan batik printing.' },
  LAINNYA_BAHAN,
]
const BAHAN_JAKET: BahanOption[] = [
  BELUM_TAHU,
  { value: 'Fleece', label: 'Fleece', desc: 'Hangat dan lembut. Standar untuk hoodie.' },
  { value: 'French Terry', label: 'French Terry', desc: 'Lebih tipis dari fleece. Cocok untuk iklim tropis.' },
  { value: 'Baby Terry', label: 'Baby Terry', desc: 'Mirip french terry, sedikit lebih tebal. Nyaman dipakai.' },
  { value: 'Taslan / Parasut', label: 'Taslan / Parasut', desc: 'Tahan air ringan. Cocok untuk jaket luar ruangan.' },
  LAINNYA_BAHAN,
]
const BAHAN_ROMPI: BahanOption[] = [
  BELUM_TAHU,
  { value: 'Drill', label: 'Drill', desc: 'Kuat dan rapi. Umum untuk rompi karyawan dan lapangan.' },
  { value: 'Twill', label: 'Twill', desc: 'Lebih halus dari drill. Cocok untuk rompi yang lebih formal.' },
  { value: 'Taslan', label: 'Taslan', desc: 'Ringan dan tahan air ringan. Cocok untuk rompi luar ruangan.' },
  { value: 'Oxford', label: 'Oxford', desc: 'Kuat dengan tekstur halus. Pilihan serbaguna.' },
  LAINNYA_BAHAN,
]
const BAHAN_CELANA: BahanOption[] = [
  BELUM_TAHU,
  { value: 'Drill', label: 'Drill', desc: 'Kuat dan tidak mudah kusut. Umum untuk celana seragam kerja.' },
  { value: 'Twill', label: 'Twill', desc: 'Lebih halus dari drill. Cocok untuk celana atau rok formal.' },
  { value: 'Katun Stretch', label: 'Katun Stretch', desc: 'Nyaman bergerak. Cocok untuk rok dan celana kasual.' },
  LAINNYA_BAHAN,
]
const BAHAN_JERSEY: BahanOption[] = [
  BELUM_TAHU,
  { value: 'Polyester / Dryfit', label: 'Polyester / Dryfit', desc: 'Standar jersey olahraga. Ringan, cepat kering, nyaman bergerak.' },
  { value: 'Hyget', label: 'Hyget', desc: 'Lebih terjangkau dari dryfit. Cocok untuk jersey event dan komunitas.' },
  { value: 'Spandex', label: 'Spandex', desc: 'Elastis dan mengikuti tubuh. Cocok untuk olahraga aktif.' },
  LAINNYA_BAHAN,
]
const BAHAN_BLAZER: BahanOption[] = [
  BELUM_TAHU,
  { value: 'Wool / Wol', label: 'Wool / Wol', desc: 'Bahan premium untuk jas dan blazer formal.' },
  { value: 'Polyester Suit', label: 'Polyester Suit', desc: 'Lebih terjangkau dari wool. Cocok untuk seragam kantor.' },
  { value: 'Linen', label: 'Linen', desc: 'Ringan dan adem. Pilihan untuk blazer di iklim tropis.' },
  LAINNYA_BAHAN,
]
const BAHAN_WEARPACK: BahanOption[] = [
  BELUM_TAHU,
  { value: 'Drill', label: 'Drill', desc: 'Kuat dan tahan lama. Standar untuk wearpack industri.' },
  { value: 'Canvas', label: 'Canvas', desc: 'Sangat kuat. Cocok untuk pekerjaan berat di lapangan.' },
  { value: 'Ripstop', label: 'Ripstop', desc: 'Tahan robek. Cocok untuk kondisi kerja yang ekstrem.' },
  LAINNYA_BAHAN,
]
const BAHAN_TOPI: BahanOption[] = [
  BELUM_TAHU,
  { value: 'Drill', label: 'Drill', desc: 'Kuat dan mudah dibentuk. Paling umum untuk topi.' },
  { value: 'Canvas', label: 'Canvas', desc: 'Tekstur kasual. Cocok untuk topi promosi.' },
  { value: 'Polyester', label: 'Polyester', desc: 'Ringan dan cepat kering. Cocok untuk topi olahraga.' },
  LAINNYA_BAHAN,
]
const BAHAN_BATIK: BahanOption[] = [
  BELUM_TAHU,
  { value: 'Batik Printing', label: 'Batik Printing', desc: 'Motif dicetak di kain. Lebih terjangkau, cocok untuk seragam massal.' },
  { value: 'Batik Cap', label: 'Batik Cap', desc: 'Dibuat dengan cap (stempel). Lebih otentik dari printing.' },
  { value: 'Batik Tulis', label: 'Batik Tulis', desc: 'Dibuat dengan tangan. Kualitas tertinggi, harga paling premium.' },
  LAINNYA_BAHAN,
]
const BAHAN_FALLBACK: BahanOption[] = [
  BELUM_TAHU,
  { value: 'Cotton Combed 30s', label: 'Cotton Combed 30s', desc: 'Lembut dan adem. Paling umum untuk kaos dan polo.' },
  { value: 'Drill', label: 'Drill', desc: 'Kuat dan rapi. Umum untuk kemeja dan seragam kerja.' },
  { value: 'Polyester', label: 'Polyester', desc: 'Ringan dan cepat kering.' },
  LAINNYA_BAHAN,
]

const BAHAN_BY_PRODUK: Record<string, BahanOption[]> = {
  'Kaos / T-Shirt': BAHAN_KAOS,
  'Kaos Kelas / Angkatan': BAHAN_KAOS,
  'Polo Shirt': BAHAN_POLO,
  'Kemeja': BAHAN_KEMEJA,
  'Seragam Identitas': BAHAN_KEMEJA,
  'Jaket / Hoodie': BAHAN_JAKET,
  'Jaket / Blazer Almamater': BAHAN_JAKET,
  'Rompi': BAHAN_ROMPI,
  'Celana / Rok': BAHAN_CELANA,
  'Celana Olahraga': BAHAN_CELANA,
  'Jersey / Kaos Tim': BAHAN_JERSEY,
  'Jersey / Olahraga': BAHAN_JERSEY,
  'Blazer / Jas': BAHAN_BLAZER,
  'Wearpack': BAHAN_WEARPACK,
  'Topi': BAHAN_TOPI,
  'Batik': BAHAN_BATIK,
}

const LOGO_OPTIONS = [
  { value: 'Sablon', label: 'Sablon', desc: 'Dicetak di atas kain. Cocok untuk desain berwarna dan detail.' },
  { value: 'Bordir', label: 'Bordir', desc: 'Dijahit ke kain. Lebih tahan lama, kesan lebih formal.' },
  { value: 'Belum tahu', label: 'Belum tahu', desc: 'Biarkan supplier yang menyarankan sesuai bahan.' },
  { value: 'Tidak ada logo', label: 'Tidak ada logo', desc: 'Polos, tanpa logo atau identitas.' },
]


// ---- Step components ----

function StepOrganisasi({ value, onSelect }: { value: string; onSelect: (v: string) => void }) {
  return (
    <div>
      <h3 className="text-gray-900 font-bold text-lg mb-1">Untuk organisasi apa seragam ini?</h3>
      <p className="text-gray-500 text-sm mb-4">Membantu kami memahami konteks kebutuhan Anda.</p>
      <div className="grid grid-cols-2 gap-2">
        {ORGANISASI_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onSelect(opt.value)}
            className={`py-3 px-3 rounded-lg border text-sm font-medium text-left transition-all ${
              value === opt.value
                ? 'border-brand-600 bg-brand-50 text-brand-700'
                : 'border-gray-200 text-gray-700 hover:border-brand-300 hover:bg-brand-50/40'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  )
}

function StepProduk({ value, onSelect, jenis_organisasi }: { value: string; onSelect: (v: string) => void; jenis_organisasi: string }) {
  const options = PRODUK_BY_ORGANISASI[jenis_organisasi] ?? PRODUK_FALLBACK
  return (
    <div>
      <h3 className="text-gray-900 font-bold text-lg mb-1">Produk apa yang ingin dipesan?</h3>
      <p className="text-gray-500 text-sm mb-4">Pilih satu. Bisa ditambah produk lain setelah ini.</p>
      <div className="grid grid-cols-2 gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onSelect(opt)}
            className={`py-2.5 px-3 rounded-lg border text-sm font-medium text-left transition-all ${
              value === opt
                ? 'border-brand-600 bg-brand-50 text-brand-700'
                : 'border-gray-200 text-gray-700 hover:border-brand-300 hover:bg-brand-50/40'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  )
}

function StepJumlah({ value, onChange, produk }: { value: string; onChange: (v: string) => void; produk: string }) {
  return (
    <div>
      <h3 className="text-gray-900 font-bold text-lg mb-1">Berapa jumlah {produk} yang dibutuhkan?</h3>
      <p className="text-gray-500 text-sm mb-4">
        Dalam satuan pcs. Semakin banyak, biasanya harga per pcs semakin murah.
      </p>
      <input
        type="number"
        min="1"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Contoh: 200"
        inputMode="numeric"
        className="form-input text-lg font-semibold w-full"
        autoFocus
      />
      <p className="text-xs text-gray-400 mt-2">
        Minimum order biasanya 12 - 24 pcs, tergantung supplier dan jenis produk.
      </p>
    </div>
  )
}

function StepBahan({ value, onSelect, jenis_seragam }: { value: string; onSelect: (v: string) => void; jenis_seragam: string }) {
  const options = BAHAN_BY_PRODUK[jenis_seragam] ?? BAHAN_FALLBACK
  return (
    <div>
      <h3 className="text-gray-900 font-bold text-lg mb-1">Bahan yang diinginkan?</h3>
      <p className="text-gray-500 text-sm mb-4">Pilih satu. Kalau belum tahu, pilih opsi pertama.</p>
      <div className="space-y-2">
        {options.map((opt) => (
          <button
            key={opt.label}
            type="button"
            onClick={() => onSelect(opt.value)}
            className={`w-full flex items-start gap-3 p-3 rounded-lg border text-left transition-all ${
              value === opt.value ? 'border-brand-600 bg-brand-50' : 'border-gray-200 hover:border-brand-300 hover:bg-brand-50/40'
            }`}
          >
            <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 mt-0.5 ${value === opt.value ? 'border-brand-600 bg-brand-600' : 'border-gray-300'}`} />
            <div>
              <p className={`text-sm font-medium ${value === opt.value ? 'text-brand-700' : 'text-gray-800'}`}>{opt.label}</p>
              <p className="text-xs text-gray-500 mt-0.5">{opt.desc}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

function StepLogo({ value, onSelect }: { value: string; onSelect: (v: string) => void }) {
  return (
    <div>
      <h3 className="text-gray-900 font-bold text-lg mb-1">Ada logo atau identitas yang perlu ditambahkan?</h3>
      <p className="text-gray-500 text-sm mb-4">Metode menentukan tampilan dan daya tahan logo.</p>
      <div className="space-y-2">
        {LOGO_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onSelect(opt.value)}
            className={`w-full flex items-start gap-3 p-3 rounded-lg border text-left transition-all ${
              value === opt.value ? 'border-brand-600 bg-brand-50' : 'border-gray-200 hover:border-brand-300 hover:bg-brand-50/40'
            }`}
          >
            <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 mt-0.5 ${value === opt.value ? 'border-brand-600 bg-brand-600' : 'border-gray-300'}`} />
            <div>
              <p className={`text-sm font-medium ${value === opt.value ? 'text-brand-700' : 'text-gray-800'}`}>{opt.label}</p>
              <p className="text-xs text-gray-500 mt-0.5">{opt.desc}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

function StepItemReview({ items, onAddMore }: { items: OrderItem[]; onAddMore: () => void }) {
  return (
    <div>
      <h3 className="text-gray-900 font-bold text-lg mb-1">
        {items.length === 1 ? '1 produk ditambahkan' : `${items.length} produk ditambahkan`}
      </h3>
      <p className="text-gray-500 text-sm mb-4">
        Lanjut untuk mengisi detail pesanan, atau tambah produk lain.
      </p>

      <div className="space-y-2 mb-4">
        {items.map((item, i) => (
          <div key={i} className="flex items-start gap-3 bg-gray-50 rounded-lg p-3 border border-gray-100">
            <div className="w-5 h-5 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
              {i + 1}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 text-sm">{item.jenis_seragam}</p>
              <p className="text-xs text-gray-500 mt-0.5">
                {item.jumlah} pcs
                {item.bahan ? ` · ${item.bahan}` : ''}
                {item.metode_logo ? ` · ${item.metode_logo}` : ''}
              </p>
              {Object.values(item.ukuran).some(v => v > 0) && (
                <p className="text-xs text-gray-400 mt-0.5">
                  {SIZES.filter(s => (item.ukuran[s] || 0) > 0).map(s => `${s}: ${item.ukuran[s]}`).join(', ')}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={onAddMore}
        className="w-full py-2.5 px-4 border border-dashed border-brand-300 text-brand-700 text-sm font-medium rounded-lg hover:bg-brand-50 transition-colors"
      >
        + Tambah produk lain
      </button>
    </div>
  )
}

function StepUkuran({
  ukuran, jumlah, onChange,
}: {
  ukuran: Record<string, number>
  jumlah: string
  onChange: (ukuran: Record<string, number>) => void
}) {
  const target = parseInt(jumlah) || 0
  const total = SIZES.reduce((sum, s) => sum + (ukuran[s] || 0), 0)

  return (
    <div>
      <h3 className="text-gray-900 font-bold text-lg mb-1">Rincian ukuran</h3>
      <p className="text-gray-500 text-sm mb-4">
        Masukkan jumlah per ukuran. Total harus {target} pcs.
      </p>

      <div className="space-y-2 mb-4">
        {SIZES.map((size) => (
          <div key={size} className="flex items-center gap-3">
            <span className="w-10 text-sm font-semibold text-gray-700">{size}</span>
            <input
              type="number"
              min="0"
              value={ukuran[size] || ''}
              onChange={(e) => {
                const val = Math.max(0, parseInt(e.target.value) || 0)
                onChange({ ...ukuran, [size]: val })
              }}
              placeholder="0"
              className="w-24 px-3 py-2 rounded-lg border border-gray-200 text-sm text-center focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
            />
            <span className="text-xs text-gray-400">pcs</span>
          </div>
        ))}
      </div>

      <div className={`flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-medium ${
        total === 0 ? 'bg-gray-50 text-gray-400' :
        total === target ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
      }`}>
        <span>Total</span>
        <span>{total} / {target} pcs</span>
      </div>

      <p className="text-xs text-gray-400 mt-3">Kosongkan semua jika belum tahu rincian ukuran.</p>
    </div>
  )
}

function StepAnggaran({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const formatted = value ? parseInt(value).toLocaleString('id-ID') : ''

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\./g, '').replace(/[^0-9]/g, '')
    onChange(raw)
  }

  return (
    <div>
      <h3 className="text-gray-900 font-bold text-lg mb-1">Berapa anggaran yang disiapkan?</h3>
      <p className="text-gray-500 text-sm mb-4">Membantu supplier menyesuaikan rekomendasi bahan dan spesifikasi.</p>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">Rp</span>
        <input
          type="text"
          inputMode="numeric"
          placeholder="0"
          value={formatted}
          onChange={handleChange}
          className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 text-gray-900 text-sm focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
        />
      </div>
      <p className="text-xs text-gray-400 mt-2">Kosongkan jika belum ada patokan.</p>
    </div>
  )
}

function StepTenggatReferensi({
  deadline, catatan, fileName, onDeadline, onCatatan, fileRef, onFileChange,
}: {
  deadline: string; catatan: string; fileName: string | null
  onDeadline: (v: string) => void; onCatatan: (v: string) => void
  fileRef: React.RefObject<HTMLInputElement>; onFileChange: (name: string | null) => void
}) {
  return (
    <div>
      <h3 className="text-gray-900 font-bold text-lg mb-1">Tenggat dan referensi</h3>
      <p className="text-gray-500 text-sm mb-4">Semua opsional. Isi yang sudah Anda tahu.</p>
      <div className="space-y-4">
        <div>
          <label className="form-label">Deadline yang diharapkan</label>
          <input type="date" value={deadline} onChange={(e) => onDeadline(e.target.value)} className="form-input" />
        </div>
        <div>
          <label className="form-label">Upload desain atau referensi</label>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="w-full border border-dashed border-gray-300 rounded-lg px-4 py-3 text-sm text-center hover:border-brand-400 hover:bg-brand-50 transition-colors"
          >
            <input ref={fileRef} type="file" accept=".jpg,.jpeg,.png,.webp,.pdf" className="hidden" onChange={(e) => onFileChange(e.target.files?.[0]?.name ?? null)} />
            {fileName
              ? <span className="text-brand-700 font-medium">{fileName}</span>
              : <span className="text-gray-400">Klik untuk upload · JPG, PNG, PDF</span>}
          </button>
        </div>
        <div>
          <label className="form-label">Catatan tambahan</label>
          <textarea
            value={catatan}
            onChange={(e) => onCatatan(e.target.value)}
            rows={3}
            placeholder="Contoh: nama di dada kiri, warna navy tua, ukuran XL ke atas..."
            className="form-input resize-none"
          />
        </div>
      </div>
    </div>
  )
}

function StepKontak({ nama, whatsapp, nama_organisasi, onChange }: {
  nama: string; whatsapp: string; nama_organisasi: string
  onChange: (field: keyof GlobalData, value: string) => void
}) {
  return (
    <div>
      <h3 className="text-gray-900 font-bold text-lg mb-1">Siapa yang kami hubungi?</h3>
      <p className="text-gray-500 text-sm mb-4">Kami akan menghubungi Anda via WhatsApp ketika penawaran sudah siap.</p>
      <div className="space-y-3">
        <div>
          <label className="form-label">Nama <span className="text-red-500">*</span></label>
          <input type="text" value={nama} onChange={(e) => onChange('nama', e.target.value)} placeholder="Nama Anda" className="form-input" autoFocus />
        </div>
        <div>
          <label className="form-label">Nomor WhatsApp <span className="text-red-500">*</span></label>
          <input type="tel" value={whatsapp} onChange={(e) => onChange('whatsapp', e.target.value)} placeholder="08xxxxxxxxxx" inputMode="tel" className="form-input" />
        </div>
        <div>
          <label className="form-label">Perusahaan / Organisasi</label>
          <input type="text" value={nama_organisasi} onChange={(e) => onChange('nama_organisasi', e.target.value)} placeholder="Opsional" className="form-input" />
        </div>
      </div>
    </div>
  )
}

// ---- Main form ----

const SIZES = ['S', 'M', 'L', 'XL', 'XXL']

const EMPTY_ITEM: OrderItem = { jenis_seragam: '', jumlah: '', ukuran: {}, bahan: '', metode_logo: '' }

const NEXT_PHASE: Partial<Record<Phase, Phase>> = {
  'organisasi': 'item-produk',
  'item-produk': 'item-jumlah',
  'item-jumlah': 'item-ukuran',
  'item-ukuran': 'item-bahan',
  'item-bahan': 'item-logo',
  'item-review': 'anggaran',
  'anggaran': 'tenggat',
  'tenggat': 'kontak',
}

const PHASE_LABEL: Record<Phase, string> = {
  'organisasi': 'Organisasi',
  'item-produk': 'Produk',
  'item-jumlah': 'Jumlah',
  'item-ukuran': 'Ukuran',
  'item-bahan': 'Bahan',
  'item-logo': 'Logo',
  'item-review': 'Ringkasan Produk',
  'anggaran': 'Anggaran',
  'tenggat': 'Tenggat & Referensi',
  'kontak': 'Kontak',
}

// 4-segment progress: Organisasi | Produk | Detail | Kontak
function getProgress(phase: Phase): number {
  if (phase === 'organisasi') return 1
  if (['item-produk', 'item-jumlah', 'item-ukuran', 'item-bahan', 'item-logo', 'item-review'].includes(phase)) return 2
  if (['anggaran', 'tenggat'].includes(phase)) return 3
  return 4
}

export default function OrderForm() {
  const router = useRouter()
  const fileRef = useRef<HTMLInputElement>(null)

  const [phase, setPhase] = useState<Phase>('organisasi')
  const [items, setItems] = useState<OrderItem[]>([])
  const [current, setCurrent] = useState<OrderItem>({ ...EMPTY_ITEM })
  const [global, setGlobal] = useState<GlobalData>({
    jenis_organisasi: '', anggaran: '', deadline: '', catatan: '', nama: '', whatsapp: '', nama_organisasi: '',
  })

  const [fileName, setFileName] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const [fieldError, setFieldError] = useState<string | null>(null)

  const setG = (field: keyof GlobalData, value: string) => {
    setGlobal(prev => ({ ...prev, [field]: value }))
    setFieldError(null)
  }

  const setC = (field: keyof OrderItem, value: string) => {
    setCurrent(prev => ({ ...prev, [field]: value }))
    setFieldError(null)
  }

  const setCUkuran = (ukuran: Record<string, number>) => {
    setCurrent(prev => ({ ...prev, ukuran }))
    setFieldError(null)
  }

  const validate = (p: Phase): string | null => {
    if (p === 'item-produk' && !current.jenis_seragam) return 'Pilih jenis produk terlebih dahulu.'
    if (p === 'item-jumlah') {
      if (!current.jumlah) return 'Masukkan jumlah yang dibutuhkan.'
      if (parseInt(current.jumlah) < 1) return 'Jumlah harus lebih dari 0.'
    }
    if (p === 'item-ukuran') {
      const target = parseInt(current.jumlah) || 0
      const total = Object.values(current.ukuran).reduce((sum, n) => sum + n, 0)
      if (total > 0 && total !== target) return `Total ukuran (${total}) harus sama dengan jumlah yang dipesan (${target} pcs).`
    }
    if (p === 'kontak') {
      if (global.nama.trim().length < 2) return 'Nama harus diisi.'
      if (global.whatsapp.trim().length < 9) return 'Nomor WhatsApp harus diisi.'
    }
    return null
  }

  const advance = () => {
    const err = validate(phase)
    if (err) { setFieldError(err); return }
    setFieldError(null)
    const next = NEXT_PHASE[phase]
    if (next) setPhase(next)
  }

  // Completes current item and goes to review
  const finishItem = (logoValue: string) => {
    const completed = { ...current, metode_logo: logoValue }
    setItems(prev => [...prev, completed])
    setCurrent({ ...EMPTY_ITEM })
    setFieldError(null)
    setTimeout(() => setPhase('item-review'), 280)
  }

  const back = () => {
    setFieldError(null)
    switch (phase) {
      case 'item-produk':
        setPhase(items.length > 0 ? 'item-review' : 'organisasi')
        break
      case 'item-jumlah': setPhase('item-produk'); break
      case 'item-ukuran': setPhase('item-jumlah'); break
      case 'item-bahan': setPhase('item-ukuran'); break
      case 'item-logo': setPhase('item-bahan'); break
      case 'item-review': {
        // Restore the last item for editing
        const last = items[items.length - 1]
        setCurrent(last)
        setItems(prev => prev.slice(0, -1))
        setPhase('item-logo')
        break
      }
      case 'anggaran': setPhase('item-review'); break
      case 'tenggat': setPhase('anggaran'); break
      case 'kontak': setPhase('tenggat'); break
    }
  }

  const autoAdvanceGlobal = (field: keyof GlobalData, value: string) => {
    setG(field, value)
    setTimeout(advance, 280)
  }

  const autoAdvanceItem = (field: keyof OrderItem, value: string) => {
    setC(field, value)
    setTimeout(advance, 280)
  }

  const onSubmit = async () => {
    const err = validate('kontak')
    if (err) { setFieldError(err); return }

    setIsSubmitting(true)
    setServerError(null)

    try {
      const formData = new FormData()
      formData.append('items', JSON.stringify(items))
      formData.append('jenis_organisasi', global.jenis_organisasi)
      formData.append('nama', global.nama)
      formData.append('whatsapp', global.whatsapp)
      if (global.nama_organisasi) formData.append('nama_organisasi', global.nama_organisasi)
      if (global.anggaran) formData.append('anggaran', global.anggaran)
      if (global.deadline) formData.append('deadline', global.deadline)
      if (global.catatan) formData.append('catatan', global.catatan)
      const file = fileRef.current?.files?.[0]
      if (file) formData.append('desain', file)

      const res = await fetch('/api/submit', { method: 'POST', body: formData })
      const json = await res.json()
      if (!res.ok) { setServerError(json.error ?? 'Terjadi kesalahan. Coba lagi.'); return }
      router.push('/success')
    } catch {
      setServerError('Koneksi gagal. Periksa internet Anda dan coba lagi.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const progress = getProgress(phase)
  const segments = ['Organisasi', 'Produk', 'Detail', 'Kontak']
  const itemNumber = items.length + 1

  return (
    <div>
      {/* Progress bar */}
      <div className="mb-5">
        <div className="flex gap-1 mb-1.5">
          {segments.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${i < progress ? 'bg-brand-600' : 'bg-gray-100'}`}
            />
          ))}
        </div>
        <div className="flex justify-between text-xs">
          {segments.map((label, i) => (
            <span key={i} className={i < progress ? 'text-brand-700 font-medium' : 'text-gray-300'}>
              {label}
            </span>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-1">
          {['item-produk', 'item-jumlah', 'item-bahan', 'item-logo'].includes(phase)
            ? `${PHASE_LABEL[phase]} · Produk ${itemNumber}`
            : PHASE_LABEL[phase]}
        </p>
      </div>

      {/* Step content */}
      <div className="min-h-[280px]">
        {phase === 'organisasi' && (
          <StepOrganisasi
            value={global.jenis_organisasi}
            onSelect={(v) => {
              setGlobal(prev => ({ ...prev, jenis_organisasi: v }))
              setItems([])
              setCurrent({ ...EMPTY_ITEM })
              setFieldError(null)
              setTimeout(advance, 280)
            }}
          />
        )}
        {phase === 'item-produk' && (
          <StepProduk
            value={current.jenis_seragam}
            onSelect={(v) => {
              setCurrent({ ...EMPTY_ITEM, jenis_seragam: v })
              setFieldError(null)
              setTimeout(advance, 280)
            }}
            jenis_organisasi={global.jenis_organisasi}
          />
        )}
        {phase === 'item-jumlah' && (
          <StepJumlah
            value={current.jumlah}
            onChange={(v) => setC('jumlah', v)}
            produk={current.jenis_seragam}
          />
        )}
        {phase === 'item-ukuran' && (
          <StepUkuran
            ukuran={current.ukuran}
            jumlah={current.jumlah}
            onChange={setCUkuran}
          />
        )}
        {phase === 'item-bahan' && (
          <StepBahan
            value={current.bahan}
            onSelect={(v) => autoAdvanceItem('bahan', v)}
            jenis_seragam={current.jenis_seragam}
          />
        )}
        {phase === 'item-logo' && (
          <StepLogo
            value={current.metode_logo}
            onSelect={finishItem}
          />
        )}
        {phase === 'item-review' && (
          <StepItemReview
            items={items}
            onAddMore={() => setPhase('item-produk')}
          />
        )}
        {phase === 'anggaran' && (
          <StepAnggaran
            value={global.anggaran}
            onChange={(v) => setG('anggaran', v)}
          />
        )}
        {phase === 'tenggat' && (
          <StepTenggatReferensi
            deadline={global.deadline}
            catatan={global.catatan}
            fileName={fileName}
            onDeadline={(v) => setG('deadline', v)}
            onCatatan={(v) => setG('catatan', v)}
            fileRef={fileRef as React.RefObject<HTMLInputElement>}
            onFileChange={setFileName}
          />
        )}
        {phase === 'kontak' && (
          <StepKontak
            nama={global.nama}
            whatsapp={global.whatsapp}
            nama_organisasi={global.nama_organisasi}
            onChange={setG}
          />
        )}
      </div>

      {/* Errors */}
      {fieldError && <p className="text-red-500 text-xs mt-1 mb-2">{fieldError}</p>}
      {serverError && (
        <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700 mb-3">
          {serverError}
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center gap-2 mt-4">
        {phase !== 'organisasi' && (
          <button type="button" onClick={back} className="px-4 py-2.5 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50">
            Kembali
          </button>
        )}
        {phase !== 'kontak' ? (
          <button type="button" onClick={advance} className="flex-1 btn-primary py-2.5 text-sm">
            Lanjut
          </button>
        ) : (
          <button type="button" onClick={onSubmit} disabled={isSubmitting} className="flex-1 btn-primary py-2.5 text-sm">
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Mengirim...
              </span>
            ) : 'Dapatkan Penawaran'}
          </button>
        )}
      </div>

      <p className="text-center text-xs text-gray-400 mt-3">
        Gratis. Tidak ada kewajiban memilih supplier mana pun.
      </p>
    </div>
  )
}
