const points = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Kami bantu review sebelum dikirim ke supplier',
    desc: 'Kalau ada informasi yang kurang atau membingungkan, kami hubungi Anda terlebih dahulu. Tidak ada yang dikirim sebelum siap.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Bekerja dengan supplier yang berpengalaman',
    desc: 'Kami hanya meneruskan ke supplier yang sudah biasa menangani pesanan seragam, bukan yang baru coba-coba.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Gratis, tanpa kewajiban apa pun',
    desc: 'Tidak ada biaya untuk mendapatkan penawaran. Tidak ada keharusan memilih supplier tertentu. Anda bebas memutuskan.',
  },
]

export default function TrustSection() {
  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Kami Ada di Setiap Langkah</h2>
          <p className="text-gray-500 max-w-md mx-auto">
            Bukan sekadar meneruskan permintaan. Kami pastikan informasi yang sampai ke supplier sudah benar dan lengkap.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {points.map((p, i) => (
            <div key={i} className="text-center p-6">
              <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center text-brand-700 mx-auto mb-4">
                {p.icon}
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{p.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
