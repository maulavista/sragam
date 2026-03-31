import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { CATEGORIES, getCategoryBySlug } from '@/lib/categories'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sragam.com'

export function generateStaticParams() {
  return CATEGORIES.map(c => ({ slug: c.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const category = getCategoryBySlug(params.slug)
  if (!category) return {}

  const title = `Vendor ${category.name} Custom – Pesan Seragam Tanpa Ribet`
  const canonicalUrl = `${siteUrl}/vendor/${category.slug}`

  return {
    title,
    description: category.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description: category.description,
      url: canonicalUrl,
      type: 'website',
      locale: 'id_ID',
      siteName: 'Sragam',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: category.description,
      images: ['/og-image.png'],
    },
  }
}

export default function VendorCategoryPage({
  params,
}: {
  params: { slug: string }
}) {
  const category = getCategoryBySlug(params.slug)
  if (!category) notFound()

  const canonicalUrl = `${siteUrl}/vendor/${category.slug}`

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${category.name} Custom`,
    serviceType: 'Uniform Supplier',
    provider: {
      '@type': 'Organization',
      name: 'Sragam',
      url: siteUrl,
    },
    areaServed: { '@type': 'Country', name: 'Indonesia' },
    description: category.description,
    url: canonicalUrl,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'IDR',
      description: `Gratis mendapatkan penawaran ${category.name} dari beberapa supplier`,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <div className="min-h-screen bg-white">
        <header className="border-b border-gray-100 py-4 px-6">
          <Link href="/" className="flex items-center gap-2 w-fit">
            <div className="w-7 h-7 bg-brand-700 rounded-md flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="currentColor">
                <path d="M7 2 Q12 7 17 2 L22 7 L19 10 L19 20 L5 20 L5 10 L2 7 Z" />
              </svg>
            </div>
            <span className="font-bold text-gray-900 text-lg tracking-tight">sragam</span>
          </Link>
        </header>

        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="max-w-2xl">
            <p className="text-brand-700 font-semibold text-sm uppercase tracking-wide mb-3">
              Kategori Seragam
            </p>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
              Vendor {category.name} Custom
            </h1>
            <p className="text-gray-500 leading-relaxed mb-10">
              {category.description}
            </p>
            <Link
              href="/#form-section"
              className="btn-primary text-base py-3.5 px-8 inline-flex items-center gap-2"
            >
              Minta Penawaran Gratis
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="mt-16 pt-10 border-t border-gray-100">
            <p className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">
              Kategori lainnya
            </p>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.filter(c => c.slug !== category.slug).map(c => (
                <Link
                  key={c.slug}
                  href={`/vendor/${c.slug}`}
                  className="text-sm px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:border-brand-400 hover:text-brand-700 transition-colors"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
