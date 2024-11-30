"use client"

import { signOut } from "next-auth/react"
import { Button } from '@/components/ui/button'
import React from 'react'

const page = () => {
  return (
    <div className="h-screen py-24">
          <Button
      onClick={() => signOut({ callbackUrl: "/login" })}
      variant="destructive"
      size="sm"
    >
      Log out
    </Button>
    </div>
  )
}

export default page
