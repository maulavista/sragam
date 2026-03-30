'use client'

function PenawaranIllustration() {
  return (
    <div className="relative">
      {/* Browser card */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        {/* Browser chrome */}
        <div className="bg-gray-100 border-b border-gray-200 px-4 py-3 flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-400 block" />
            <span className="w-3 h-3 rounded-full bg-yellow-400 block" />
            <span className="w-3 h-3 rounded-full bg-green-400 block" />
          </div>
          <div className="flex-1 bg-white rounded-md px-3 py-1 text-xs text-gray-400 text-center">
            sragem.com/penawaran/abc123
          </div>
        </div>

        {/* Card content */}
        <div className="p-5">
          <p className="text-xs font-semibold text-brand-700 mb-1">Kebutuhan Anda</p>
          <p className="text-sm font-medium text-gray-800 mb-4">200 pcs Polo Cotton Combed 30s, Sablon</p>

          {/* Supplier rows */}
          <div className="space-y-2">
            {/* Supplier A */}
            <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3 bg-white">
              <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500 flex-shrink-0">
                A
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900">Supplier A</p>
                <p className="text-xs text-gray-400 flex items-center gap-1">
                  Bandung
                  <span className="text-yellow-400">★</span>
                  <span>4.8</span>
                </p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-sm font-bold text-gray-900">Rp 68.000</p>
                <p className="text-xs text-gray-400">/pcs</p>
              </div>
            </div>

            {/* Supplier B — recommended */}
            <div className="relative flex items-center gap-3 border-2 border-brand-500 rounded-xl px-4 py-3 bg-brand-50/30">
              <div className="absolute -top-2.5 left-3">
                <span className="bg-brand-600 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
                  Rekomendasi
                </span>
              </div>
              <div className="w-8 h-8 rounded-lg bg-brand-100 flex items-center justify-center text-xs font-bold text-brand-700 flex-shrink-0">
                B
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900">Supplier B</p>
                <p className="text-xs text-gray-400 flex items-center gap-1">
                  Jakarta
                  <span className="text-yellow-400">★</span>
                  <span>4.7</span>
                </p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-sm font-bold text-gray-900">Rp 82.000</p>
                <p className="text-xs text-gray-400">/pcs</p>
              </div>
            </div>

            {/* Supplier C */}
            <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3 bg-white">
              <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500 flex-shrink-0">
                C
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900">Supplier C</p>
                <p className="text-xs text-gray-400 flex items-center gap-1">
                  Surabaya
                  <span className="text-yellow-400">★</span>
                  <span>4.6</span>
                </p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-sm font-bold text-gray-900">Rp 95.000</p>
                <p className="text-xs text-gray-400">/pcs</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-3">
            <span className="text-xs text-brand-600 font-medium">Lihat detail →</span>
          </div>
        </div>
      </div>

      {/* Toast notification */}
      <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg border border-gray-100 px-4 py-3 flex items-center gap-3">
        <div className="w-7 h-7 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
          <svg className="w-4 h-4 text-green-600" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-900">Penawaran baru!</p>
          <p className="text-xs text-gray-500">Supplier C dari Surabaya</p>
        </div>
      </div>
    </div>
  )
}

export default function HeroSection() {
  const scrollToForm = () => {
    document.getElementById('form-section')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="bg-white py-16 lg:py-24 border-b border-gray-100">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left: copy */}
          <div>
            <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-4 py-1.5 text-sm text-green-700 font-medium mb-7">
              <span className="w-2 h-2 bg-green-500 rounded-full inline-block" />
              Gratis &middot; Tanpa kewajiban memilih
            </div>

            <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-gray-900 mb-5">
              Pesan seragam tanpa bolak-balik chat supplier
            </h1>

            <p className="text-lg text-gray-500 leading-relaxed mb-10">
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

          {/* Right: illustration */}
          <div className="hidden lg:block px-4 pb-6">
            <PenawaranIllustration />
          </div>

        </div>

        {/* Mobile illustration — shown below copy, clipped nicely */}
        <div className="lg:hidden mt-12 px-2 pb-6">
          <PenawaranIllustration />
        </div>
      </div>
    </section>
  )
}
