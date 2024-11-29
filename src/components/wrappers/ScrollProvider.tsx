"use client"

import { useScroll } from "motion/react"
import { ReactNode } from "react"
import { MotionValue } from "framer-motion"
import Hero from "@/components/home/Hero"
import FloatingElements from "@/components/home/FloatingElements"

interface ScrollProviderProps {
  children: ReactNode
}

interface ScrollContextProps {
  scrollProgress: MotionValue<number>
  children: ReactNode
}

function ScrollContext({ scrollProgress, children }: ScrollContextProps) {
  return (
    <div className="relative">
      <div className="fixed inset-0 w-full h-screen">
        <FloatingElements scrollProgress={scrollProgress} />
      </div>

      <div className="relative">
        <div className="relative h-screen">
          <Hero scrollProgress={scrollProgress} />
        </div>
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </div>
  )
}

export function ScrollProvider({ children }: ScrollProviderProps) {
  const { scrollYProgress } = useScroll()
  
  return (
    <ScrollContext scrollProgress={scrollYProgress}>
      {children}
    </ScrollContext>
  )
}