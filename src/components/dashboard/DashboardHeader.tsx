'use client'
import { UserNav } from "@/components/dashboard/UserNav"
import { ModeToggle } from "@/components/shared/ModeToggle"
import { usePathname } from "next/navigation"

export default function DashboardHeader() {
  const pathname = usePathname()
  const title = pathname === "/dashboard" 
    ? "Dashboard" 
    : pathname.split("/").pop()?.replace(/-/g, " ").replace(/^\w/, c => c.toUpperCase())

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-black/50 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-6">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white capitalize">{title}</h1>
        <div className="flex items-center gap-4">
          <ModeToggle />
          <UserNav />
        </div>
      </div>
    </header>
  )
}