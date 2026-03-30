import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import ProblemSection from '@/components/ProblemSection'
import HowItWorks from '@/components/HowItWorks'
import ProductsSection from '@/components/ProductsSection'
import OrderFormSection from '@/components/OrderFormSection'
import FAQSection from '@/components/FAQSection'
import Footer from '@/components/Footer'
import StickyMobileCTA from '@/components/StickyMobileCTA'

export default function Home() {
  return (
    <main className="pb-16 md:pb-0">
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
