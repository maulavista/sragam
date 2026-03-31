import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-10">
      <div className="section-container">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <img src="/logo.svg" alt="Sragam" width={120} height={32} className="h-8 w-auto brightness-0 invert" />

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
