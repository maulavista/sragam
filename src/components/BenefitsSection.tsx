const benefits = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
      </svg>
    ),
    title: 'Tidak perlu ulang-ulang jelasin',
    desc: 'Satu kali isi, semua supplier sudah paham kebutuhan Anda. Tidak ada pertanyaan yang sama datang dari arah yang berbeda.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Risiko salah produksi jauh berkurang',
    desc: 'Semua detail tercatat dengan jelas sebelum dikirim ke supplier. Tidak ada yang terlewat karena lupa disampaikan.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M4 6h16M4 10h16M4 14h16M4 18h16" />
      </svg>
    ),
    title: 'Dapat beberapa penawaran tanpa harus cari sendiri',
    desc: 'Tidak perlu buka-buka kontak, tidak perlu chat sana-sini. Penawaran datang kepada Anda.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: 'Penawaran mudah dibandingkan',
    desc: 'Format yang seragam membuat perbandingan jadi cepat dan adil. Harga, bahan, waktu produksi — semua ada di satu tempat.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Lebih percaya diri sebelum memilih supplier',
    desc: 'Anda punya cukup informasi untuk membuat keputusan yang baik, bukan sekadar memilih karena tidak ada pilihan lain.',
  },
]

export default function BenefitsSection() {
  return (
    <section className="py-16 lg:py-20 bg-sky-50">
      <div className="section-container">
        <div className="text-center mb-12">
          <p className="text-brand-700 font-semibold text-sm uppercase tracking-wide mb-3">
            Keuntungan
          </p>
          <h2 className="text-3xl font-bold text-gray-900">Kenapa Ini Lebih Mudah</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {benefits.map((b, i) => (
            <div key={i} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
              <div className="w-9 h-9 bg-brand-100 rounded-lg flex items-center justify-center text-brand-700 mb-4">
                {b.icon}
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{b.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
