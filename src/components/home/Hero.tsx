"use client"

import { useTransform, MotionValue } from "motion/react"
import Image from "next/image"
import Link from "next/link"
import { Button } from '@/components/ui/button'
import { ArrowRight } from "lucide-react"
import MotionDiv from "@/components/animations/MotionDiv"
import MotionH1 from "@/components/animations/MotionH1"

interface HeroProps {
  scrollProgress: MotionValue<number>
}

export default function Hero({ scrollProgress }: HeroProps) {
  const imageScale = useTransform(scrollProgress, [0, 0.5], [1.1, 1.3])
  const opacity = useTransform(scrollProgress, [0, 0.3], [1, 0])
  const textY = useTransform(scrollProgress, [0, 0.3], [0, 100])
  const blur = useTransform(scrollProgress, [0, 0.5], [0, 10])
  
  return (
    <div className="fixed inset-0 w-full h-screen overflow-hidden">
      <MotionDiv 
        style={{ 
          scale: imageScale,
          filter: `blur(${blur}px)`,
        }}
        className="absolute inset-0 w-full h-full"
      >
        <Image
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c"
          alt="Team collaboration"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-grid z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/80 z-20" />
      </MotionDiv>

      <MotionDiv 
        style={{ opacity, y: textY }}
        className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary-500/10 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary-500/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <MotionH1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6"
          >
            Manage Projects
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400">
              With Ease
            </span>
          </MotionH1>

          <MotionDiv 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-12"
          >
            Streamline your workflow, collaborate seamlessly, and deliver projects on time
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/register">
              <MotionDiv
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
                <Button 
                  className="relative bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white px-8 py-6 rounded-xl text-lg font-medium flex items-center gap-2"
                >
                  Get Started
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </MotionDiv>
            </Link>

            <Link href="#features">
              <Button 
                variant="ghost"
                className="text-white hover:text-primary-400 px-8 py-6 text-lg font-medium transition-colors duration-300"
              >
                Learn More
              </Button>
            </Link>
          </MotionDiv>
        </div>
      </MotionDiv>
    </div>
  )
}