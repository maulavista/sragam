import type { Metadata } from 'next'
import Link from 'next/link'
import SupplierForm from '@/components/SupplierForm'

export const metadata: Metadata = {
  title: 'Daftar sebagai Supplier – Sragam',
  description: 'Bergabung sebagai supplier seragam di Sragam dan dapatkan akses ke pembeli yang sudah siap memesan.',
}

export default function SupplierPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Simple header */}
      <header className="border-b border-gray-100 py-4 px-6">
        <Link href="/" className="flex items-center gap-2 w-fit">
          <div className="w-7 h-7 bg-brand-700 rounded-md flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="currentColor">
              <path d="M7 2 Q12 7 17 2 L22 7 L19 10 L19 20 L5 20 L5 10 L2 7 Z"/>
            </svg>
          </div>
          <span className="font-bold text-gray-900 text-lg tracking-tight">sragam</span>
        </Link>
      </header>

      <main className="section-container py-14 lg:py-20">
        <div className="max-w-2xl">
          <p className="text-brand-700 font-semibold text-sm uppercase tracking-wide mb-3">
            Untuk Supplier
          </p>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            Daftar sebagai supplier
          </h1>
          <p className="text-gray-500 leading-relaxed mb-10">
            Kami menghubungkan pembeli seragam dengan supplier terpercaya. Isi form di bawah dan kami akan menghubungi Anda kalau ada pesanan yang cocok.
          </p>

          <div className="bg-white rounded-2xl border border-gray-200 p-6 lg:p-8">
            <SupplierForm />
          </div>
        </div>
      </main>
    </div>
  )
}
