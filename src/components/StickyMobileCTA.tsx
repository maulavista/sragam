'use client'

export default function StickyMobileCTA() {
  const scrollToForm = () => {
    document.getElementById('form-section')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-gray-200 px-4 py-3 shadow-lg">
      <button
        onClick={scrollToForm}
        className="btn-primary w-full py-3 text-base"
      >
        Minta Penawaran Sekarang
      </button>
    </div>
  )
}
