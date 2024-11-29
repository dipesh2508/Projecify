import Stats from "@/components/home/Stats"
import Testimonials from "@/components/home/Testimonials"
import HowItWorks from "@/components/home/HowItWorks"
import Features from "@/components/home/Features"
import CallToAction from "@/components/home/CTA"
import About from '@/components/home/About'
import { ScrollProvider } from "@/components/wrappers/ScrollProvider"

export default function Home() {
  return (
    <ScrollProvider>
      <Stats />
      <HowItWorks />
      <Features />
      <Testimonials />
      <CallToAction />
      <About />
    </ScrollProvider>
  )
}
