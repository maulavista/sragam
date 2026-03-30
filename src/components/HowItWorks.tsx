const steps = [
  {
    step: '1',
    title: 'Isi form sekali',
    desc: 'Ceritakan kebutuhan Anda: jenis, jumlah, bahan, logo. Kami susun jadi dokumen lengkap.',
  },
  {
    step: '2',
    title: 'Kami kirim ke supplier',
    desc: 'Dokumen yang sama dikirim ke beberapa supplier. Tidak ada yang dapat info berbeda.',
  },
  {
    step: '3',
    title: 'Bandingkan & pilih',
    desc: 'Terima penawaran dalam format seragam. Harga, bahan, waktu, tinggal bandingkan.',
  },
]

export default function HowItWorks() {
  return (
    <section className="py-16 lg:py-20 bg-gray-50">
      <div className="section-container">
        <div className="mb-12 text-center sm:text-left">
          <p className="text-brand-700 font-semibold text-sm uppercase tracking-wide mb-3">
            Cara Kerja
          </p>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Tiga langkah, selesai</h2>
          <p className="text-gray-500 max-w-lg">
            Tidak perlu hubungi supplier satu per satu. Isi sekali, kami yang urus.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-8 lg:gap-12 relative">
          {/* Connector line (desktop) */}
          <div className="hidden sm:block absolute top-8 left-[calc(16.666%+2rem)] right-[calc(16.666%+2rem)] h-px bg-gray-300" />

          {steps.map((s, i) => (
            <div key={i} className="relative text-center">
              <div className="w-16 h-16 bg-brand-700 rounded-2xl flex items-center justify-center mx-auto mb-5 relative z-10 shadow-md shadow-brand-200">
                <span className="text-2xl font-extrabold text-white">{s.step}</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{s.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
