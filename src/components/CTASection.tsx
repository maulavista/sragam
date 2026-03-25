'use client'

export default function CTASection() {
  const scrollToForm = () => {
    document.getElementById('form-section')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="py-16 bg-brand-900 text-white">
      <div className="section-container text-center">
        <h2 className="text-3xl font-bold mb-3">Siap Mulai?</h2>
        <p className="text-blue-200 mb-8 max-w-lg mx-auto">
          Isi form di atas, ceritakan kebutuhan seragam Anda, dan biarkan kami yang urus sisanya.
        </p>

        <button
          onClick={scrollToForm}
          className="bg-white text-brand-800 hover:bg-blue-50 font-bold py-3.5 px-8 rounded-xl
                     transition-colors text-base shadow-lg"
        >
          Isi Kebutuhan Sekarang
        </button>

        <p className="text-blue-300 text-sm mt-4">
          Gratis. Tidak ada kewajiban. Tidak ada pertanyaan berulang.
        </p>
      </div>
    </section>
  )
}
