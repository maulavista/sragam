'use client'

export default function HeroSection() {
  const scrollToForm = () => {
    document.getElementById('form-section')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="bg-white py-20 lg:py-28 border-b border-gray-100">
      <div className="section-container">

        <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-4 py-1.5 text-sm text-green-700 font-medium mb-7">
          <span className="w-2 h-2 bg-green-500 rounded-full inline-block" />
          Gratis &middot; Tanpa kewajiban memilih
        </div>

        <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-gray-900 mb-5 max-w-2xl">
          Pesan seragam tanpa bolak-balik chat supplier
        </h1>

        <p className="text-lg text-gray-500 leading-relaxed max-w-xl mb-10">
          Isi form sekali. Kami kirim ke beberapa supplier sekaligus. Anda terima penawaran yang sudah siap dibandingkan.
        </p>

        <div className="flex items-center gap-5 flex-wrap">
          <button
            onClick={scrollToForm}
            className="btn-primary text-base py-3.5 px-8 flex items-center gap-2"
          >
            Minta Penawaran Gratis
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <span className="flex items-center gap-2 text-sm text-gray-500">
            <svg className="w-4 h-4 text-green-500 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Respon dalam 24 jam
          </span>
        </div>

      </div>
    </section>
  )
}
