const problems = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    title: 'Harus jelasin hal yang sama berulang kali',
    desc: 'Setiap kali hubungi supplier baru, Anda mulai dari awal lagi. Jenis, jumlah, bahan, desain, semua diketik ulang di WhatsApp satu per satu.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Bolak-balik chat yang tidak jelas ujungnya',
    desc: '"Bahan apa ya kak?" "Logonya mau sablon atau bordir?" "Ukurannya gimana?" Pertanyaan yang sama datang dari supplier yang berbeda.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: 'Penawaran yang susah dibandingkan',
    desc: 'Satu supplier kasih harga per lusin, yang lain per pcs. Satu sudah termasuk ongkir, yang lain belum. Akhirnya Anda tidak tahu mana yang benar-benar lebih baik.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Salah produksi karena informasi tidak lengkap',
    desc: 'Warna sedikit berbeda. Sablon tidak sesuai posisi. Ukuran tidak sesuai ekspektasi. Padahal sudah dibicarakan, tapi ada yang terlewat di tengah jalan.',
  },
]

export default function ProblemSection() {
  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Pesan Seragam Itu Harusnya Tidak Serumit Ini
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Kalau Anda pernah pesan seragam untuk kantor, acara, atau sekolah,
            kemungkinan besar Anda pernah mengalami salah satu dari ini.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {problems.map((p, i) => (
            <div
              key={i}
              className="flex gap-4 p-5 rounded-xl border border-red-100 bg-red-50/40"
            >
              <div className="w-10 h-10 rounded-lg bg-red-100 text-red-500 flex items-center justify-center flex-shrink-0">
                {p.icon}
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-1">{p.title}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
