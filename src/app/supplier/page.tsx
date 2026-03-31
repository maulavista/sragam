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
        <Link href="/">
          <img src="/logo.svg" alt="Sragam" width={120} height={32} className="h-8 w-auto" />
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
