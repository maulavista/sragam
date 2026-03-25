const steps = [
  {
    number: '01',
    title: 'Isi sekali, kami yang susun',
    desc: 'Ceritakan kebutuhan Anda lewat form. Kami rapikan menjadi dokumen yang lengkap dan siap dikirim ke supplier.',
  },
  {
    number: '02',
    title: 'Semua supplier dapat informasi yang sama',
    desc: 'Tidak ada yang menerima informasi berbeda. Semua mulai dari titik yang sama sehingga penawaran mereka bisa benar-benar dibandingkan.',
  },
  {
    number: '03',
    title: 'Penawaran datang dalam format yang seragam',
    desc: 'Harga, bahan, metode logo, waktu produksi. Semuanya tersaji dalam format yang sama. Pilih yang paling sesuai.',
  },
]

export default function SolutionSection() {
  return (
    <section className="py-16 lg:py-20 bg-sky-50">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-brand-700 font-semibold text-sm uppercase tracking-wide mb-3">
              Cara Kerja
            </p>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Tiga Langkah, Selesai
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Tidak perlu menghubungi supplier satu per satu atau menjelaskan
              hal yang sama berkali-kali. Satu kali isi, kami yang urus sisanya.
            </p>
          </div>

          <div className="space-y-5">
            {steps.map((s) => (
              <div key={s.number} className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-brand-700 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                  {s.number}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">{s.title}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
