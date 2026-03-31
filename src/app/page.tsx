import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import ProblemSection from '@/components/ProblemSection'
import HowItWorks from '@/components/HowItWorks'
import ProductsSection from '@/components/ProductsSection'
import OrderFormSection from '@/components/OrderFormSection'
import FAQSection from '@/components/FAQSection'
import Footer from '@/components/Footer'
import StickyMobileCTA from '@/components/StickyMobileCTA'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sragam.com'

export const metadata: Metadata = {
  alternates: {
    canonical: siteUrl,
  },
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Custom Uniform Procurement',
  serviceType: 'Uniform Supplier',
  provider: {
    '@type': 'Organization',
    name: 'Sragam',
    url: siteUrl,
  },
  areaServed: {
    '@type': 'Country',
    name: 'Indonesia',
  },
  description:
    'Platform pengadaan seragam B2B. Isi form sekali, kami kirim ke beberapa supplier terpercaya, Anda terima penawaran yang sudah siap dibandingkan.',
  url: siteUrl,
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'IDR',
    description: 'Gratis mendapatkan penawaran dari beberapa supplier seragam',
  },
}

export default function Home() {
  return (
    <main className="pb-16 md:pb-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <HowItWorks />
      <ProductsSection />
      <OrderFormSection />
      <FAQSection />
      <Footer />
      <StickyMobileCTA />
    </main>
  )
}
