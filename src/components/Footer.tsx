import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-10">
      <div className="section-container">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-brand-700 rounded-md flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="currentColor">
                <path d="M7 2 Q12 7 17 2 L22 7 L19 10 L19 20 L5 20 L5 10 L2 7 Z"/>
              </svg>
            </div>
            <span className="text-white font-bold text-lg tracking-tight">sragam</span>
          </div>

          <Link
            href="/supplier"
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            Mau bergabung sebagai supplier? <span className="underline underline-offset-2">Daftar di sini</span>
          </Link>

          <p className="text-xs">&copy; {new Date().getFullYear()} Sragam</p>
        </div>
      </div>
    </footer>
  )
}
