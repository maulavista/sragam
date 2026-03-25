'use client'

export default function HeroSection() {
  const scrollToForm = () => {
    document.getElementById('form-section')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="bg-gradient-to-br from-brand-900 via-brand-800 to-brand-700 text-white py-20 lg:py-28">
      <div className="section-container text-center">

        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm text-blue-100 mb-7">
          <span className="w-2 h-2 bg-green-400 rounded-full inline-block" />
          Gratis &middot; Tanpa kewajiban memilih
        </div>

        <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-5">
          Pesan Seragam<br />Tanpa Salah Paham
        </h1>

        <p className="text-lg text-blue-100 leading-relaxed max-w-xl mx-auto mb-8">
          Ceritakan kebutuhan sekali. Kami kirim ke beberapa supplier dan susunkan penawarannya agar langsung bisa dibandingkan.
        </p>

        <button
          onClick={scrollToForm}
          className="bg-amber-400 hover:bg-amber-300 text-brand-900 font-extrabold py-5 px-14 rounded-xl
                     transition-colors text-lg shadow-xl shadow-black/20"
        >
          Minta Penawaran Sekarang
        </button>

      </div>
    </section>
  )
}
