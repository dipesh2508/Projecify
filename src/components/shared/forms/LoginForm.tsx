"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { FcGoogle } from "react-icons/fc"

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    setIsLoading(true)

    try {
      // Add login logic here
      toast({
        title: "Success",
        description: "Logged in successfully",
      })
      router.push("/dashboard")
    } catch (error: unknown) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      })
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Button 
        variant="outline" 
        className="w-full bg-white/5 hover:bg-white/10 border-gray-700 text-gray-200"
        onClick={() => {/* Add Google sign-in logic */}}
      >
        <FcGoogle className="mr-2 h-5 w-5" />
        Continue with Google
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-700" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-black px-2 text-gray-400">Or continue with</span>
        </div>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <Input
            type="email"
            placeholder="Email"
            disabled={isLoading}
            className="bg-white/5 border-gray-700 focus-visible:ring-primary-500 text-gray-200"
            required
          />
          <Input
            type="password"
            placeholder="Password"
            disabled={isLoading}
            className="bg-white/5 border-gray-700 focus-visible:ring-primary-500 text-gray-200"
            required
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white"
          disabled={isLoading}
        >
          {isLoading ? "Signing in..." : "Sign in"}
        </Button>
      </form>

      <p className="text-center text-sm text-gray-400">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-primary-400 hover:text-primary-300 font-medium">
          Create account
        </Link>
      </p>
    </div>
  )
}