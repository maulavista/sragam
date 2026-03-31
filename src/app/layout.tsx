import type { Metadata } from 'next'
import { Suspense } from 'react'
import AuthModal from '@/components/AuthModal'
import './globals.css'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sragam.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Sragam: Pesan Seragam Tanpa Salah Paham',
    template: '%s | Sragam',
  },
  description:
    'Ceritakan kebutuhan seragam sekali. Kami susun dengan rapi dan kirim ke beberapa supplier. Terima penawaran yang jelas dan mudah dibandingkan.',
  // Canonical: force lowercase, no trailing slash, no www — enforced by middleware redirect
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Sragam: Pesan Seragam Tanpa Salah Paham',
    description:
      'Ceritakan kebutuhan seragam sekali. Kami susun dengan rapi dan kirim ke beberapa supplier. Terima penawaran yang jelas dan mudah dibandingkan.',
    type: 'website',
    locale: 'id_ID',
    url: siteUrl,
    siteName: 'Sragam',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Sragam – Pesan Seragam Tanpa Salah Paham',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sragam: Pesan Seragam Tanpa Salah Paham',
    description:
      'Ceritakan kebutuhan seragam sekali. Kami susun dengan rapi dan kirim ke beberapa supplier.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Sragam',
  url: siteUrl,
  logo: `${siteUrl}/og-image.png`,
  description:
    'Platform pengadaan seragam B2B yang menghubungkan pembeli dengan supplier terpercaya di seluruh Indonesia.',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    email: 'cs@sragam.com',
    availableLanguage: 'Indonesian',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body>
        {children}
        <Suspense>
          <AuthModal />
        </Suspense>
      </body>
    </html>
  )
}
