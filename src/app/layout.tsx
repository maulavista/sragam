import type { Metadata } from 'next'
import { Suspense } from 'react'
import AuthModal from '@/components/AuthModal'
import './globals.css'

export const metadata: Metadata = {
  title: 'Sragam: Pesan Seragam Tanpa Salah Paham',
  description:
    'Ceritakan kebutuhan seragam sekali. Kami susun dengan rapi dan kirim ke beberapa supplier. Terima penawaran yang jelas dan mudah dibandingkan.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  openGraph: {
    title: 'Sragam: Pesan Seragam Tanpa Salah Paham',
    description:
      'Ceritakan kebutuhan seragam sekali. Kami susun dengan rapi dan kirim ke beberapa supplier. Terima penawaran yang jelas dan mudah dibandingkan.',
    type: 'website',
    locale: 'id_ID',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body>
        {children}
        <Suspense>
          <AuthModal />
        </Suspense>
      </body>
    </html>
  )
}
