'use client'

import { useState } from 'react'
import type { ReactNode } from 'react'
import Link from 'next/link'

const faqs: { q: string; a: ReactNode }[] = [
  {
    q: 'Apakah layanan ini gratis?',
    a: 'Ya, gratis sepenuhnya. Kami tidak memungut biaya apa pun untuk mendapatkan penawaran.',
  },
  {
    q: 'Apa yang terjadi setelah saya submit?',
    a: 'Kami rapikan kebutuhan Anda lalu kirimkan ke beberapa supplier. Kalau ada yang perlu dikonfirmasi, kami hubungi via WhatsApp.',
  },
  {
    q: 'Bagaimana kalau saya belum tahu spesifikasi lengkapnya?',
    a: 'Tidak masalah. Isi semaksimal yang Anda tahu dan pilih "belum tahu" untuk sisanya. Kami bantu menyempurnakan sebelum dikirim ke supplier.',
  },
  {
    q: 'Siapa suppliernya?',
    a: 'Kami bekerja dengan supplier berpengalaman di bidang seragam. Nama dan detail mereka akan disertakan bersama penawaran.',
  },
  {
    q: 'Berapa lama sampai saya terima penawaran?',
    a: 'Tergantung respons supplier dan kelengkapan informasi Anda. Yang pasti, penawaran yang Anda terima sudah lengkap dan siap dibandingkan.',
  },
  {
    q: 'Saya supplier seragam — bagaimana cara bergabung?',
    a: (
      <>
        Kami selalu terbuka untuk bekerja sama dengan supplier baru.{' '}
        <Link
          href="/supplier"
          className="text-brand-700 font-medium underline underline-offset-2 hover:text-brand-800"
        >
          Isi form pendaftaran supplier
        </Link>{' '}
        dan ceritakan sedikit tentang bisnis dan pengalaman Anda.
      </>
    ),
  },
]

function FAQItem({ q, a }: { q: string; a: ReactNode }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left gap-4"
      >
        <span className="font-medium text-gray-900">{q}</span>
        <svg
          className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="pb-5 -mt-2">
          <p className="text-gray-600 leading-relaxed text-sm">{a}</p>
        </div>
      )}
    </div>
  )
}

export default function FAQSection() {
  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="section-container">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">
            Pertanyaan yang Sering Ditanyakan
          </h2>
        </div>

        <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-gray-200 px-6 divide-gray-200">
          {faqs.map((faq, i) => (
            <FAQItem key={i} {...faq} />
          ))}
        </div>
      </div>
    </section>
  )
}
