"use client"

import { ReactNode } from "react"
import MotionDiv from "../animations/MotionDiv"

interface AuthPageWrapperProps {
  children: ReactNode
}

export function AuthPageWrapper({ children }: AuthPageWrapperProps) {
  return (
    <MotionDiv
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative z-10 min-h-screen flex items-center justify-center p-4"
    >
      <MotionDiv
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{
          duration: 0.4,
          delay: 0.1,
          ease: "easeOut"
        }}
        className="relative w-full max-w-md"
      >
        {children}
      </MotionDiv>
    </MotionDiv>
  )
}