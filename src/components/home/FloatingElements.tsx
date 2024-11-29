"use client"

import { MotionValue, useTransform } from "motion/react"
import MotionDiv from "@/components/animations/MotionDiv"

interface FloatingElementsProps {
  scrollProgress: MotionValue<number>
}

export default function FloatingElements({ scrollProgress }: FloatingElementsProps) {
  const rightElementX = useTransform(scrollProgress, [0, 1], ["0%", "100%"])
  const leftElementX = useTransform(scrollProgress, [0, 1], ["0%", "-100%"])
  const scale = useTransform(scrollProgress, [0, 0.5], [1, 2])
  const opacity = useTransform(scrollProgress, [0, 0.5, 1], [1, 0.5, 0])

  return (
    <>
      <MotionDiv
        style={{ 
          x: rightElementX,
          scale,
          opacity
        }}
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ 
          y: {
            duration: 5,
            repeat: Infinity,
            ease: "linear"
          }
        }}
        className="fixed top-1/4 right-10 w-20 h-20 bg-primary-500/20 rounded-full blur-xl"
      />
      <MotionDiv
        style={{ 
          x: leftElementX,
          scale,
          opacity
        }}
        animate={{ 
          y: [0, 20, 0],
          rotate: [0, -5, 0]
        }}
        transition={{ 
          y: {
            duration: 4,
            repeat: Infinity,
            ease: "linear"
          }
        }}
        className="fixed bottom-1/4 left-10 w-32 h-32 bg-secondary-400/20 rounded-full blur-xl"
      />
      <MotionDiv
        style={{ 
          scale,
          opacity
        }}
        animate={{ 
          y: [0, 30, 0],
          x: [0, 30, 0]
        }}
        transition={{ 
          duration: 6,
          repeat: Infinity,
          ease: "linear"
        }}
        className="fixed top-1/3 left-1/4 w-24 h-24 bg-primary-400/10 rounded-full blur-xl"
      />
      <MotionDiv
        style={{ 
          scale,
          opacity
        }}
        animate={{ 
          y: [0, -25, 0],
          x: [0, -25, 0]
        }}
        transition={{ 
          duration: 7,
          repeat: Infinity,
          ease: "linear"
        }}
        className="fixed bottom-1/3 right-1/4 w-28 h-28 bg-secondary-500/10 rounded-full blur-xl"
      />
    </>
  )
}