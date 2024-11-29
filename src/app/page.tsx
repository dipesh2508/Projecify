"use client";

import { Hero } from "@/components/home/Hero";
import { Features } from "@/components/home/Features";
import { FloatingElements } from "@/components/home/FloatingElements";
import { Stats } from "@/components/home/Stats";
import { Testimonials } from "@/components/home/Testimonials";
import { HowItWorks } from "@/components/home/HowItWorks";
import { CallToAction } from "@/components/home/CTA";
import { useScroll } from "motion/react";
import {About} from '@/components/home/About'

export default function Home() {
  const { scrollYProgress } = useScroll();

  return (
    <>
      <div className="fixed inset-0 w-full h-screen">
        <FloatingElements scrollProgress={scrollYProgress} />
      </div>

      <div className="relative">
        <div className="relative h-screen">
          <Hero scrollProgress={scrollYProgress} />
        </div>
        <div className="relative z-10 bg-gradient-to-b from-black via-gray-900 to-white">
          <Stats />
          <HowItWorks />
          <Features />
          <Testimonials />
          <CallToAction />
          <About />
        </div>
      </div>
    </>
  );
}
