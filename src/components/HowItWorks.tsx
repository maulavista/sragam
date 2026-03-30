const steps = [
  {
    step: '1',
    title: 'Isi form sekali',
    desc: 'Ceritakan kebutuhan Anda: jenis, jumlah, bahan, logo. Kami susun jadi dokumen lengkap.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
  },
  {
    step: '2',
    title: 'Kami kirim ke supplier',
    desc: 'Dokumen yang sama dikirim ke beberapa supplier. Tidak ada yang dapat info berbeda.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0" />
      </svg>
    ),
  },
  {
    step: '3',
    title: 'Bandingkan & pilih',
    desc: 'Terima penawaran dalam format seragam. Harga, bahan, waktu, tinggal bandingkan.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
]

export default function HowItWorks() {
  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="section-container">
        <div className="text-center mb-12">
          <p className="text-brand-700 font-semibold text-sm uppercase tracking-wide mb-3">
            Cara Kerja
          </p>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Tiga langkah, selesai</h2>
          <p className="text-gray-500 max-w-lg mx-auto">
            Tidak perlu hubungi supplier satu per satu. Isi sekali, kami yang urus.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 lg:gap-10 relative">
          {/* Connector line (desktop) */}
          <div className="hidden sm:block absolute top-10 left-1/6 right-1/6 h-0.5 bg-gray-200 -z-0" />

          {steps.map((s, i) => (
            <div key={i} className="relative text-center">
              <div className="w-16 h-16 bg-brand-50 border-2 border-brand-200 rounded-2xl flex items-center justify-center text-brand-700 mx-auto mb-4 relative z-10 bg-white">
                {s.icon}
              </div>
              <div className="w-7 h-7 bg-brand-700 text-white rounded-full flex items-center justify-center text-sm font-bold mx-auto -mt-3 mb-4 relative z-10">
                {s.step}
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{s.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
