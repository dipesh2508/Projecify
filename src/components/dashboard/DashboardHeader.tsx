'use client'
import { UserNav } from "@/components/dashboard/UserNav"
import { ModeToggle } from "@/components/shared/ModeToggle"
import { usePathname } from "next/navigation"

export default function DashboardHeader() {
  const pathname = usePathname()
  
  const getTitle = () => {
    if (pathname === "/dashboard") return "Dashboard";
    if (pathname.match(/\/dashboard\/projects\/[^/]+$/)) return "Project Details";
    if (pathname.match(/\/dashboard\/projects\/[^/]+\/tasks\/new/)) return "Add Task";
    if (pathname.match(/\/dashboard\/projects\/[^/]+\/tasks\/[^/]+$/)) return "Task Details";
    
    return pathname
      .split("/")
      .pop()
      ?.replace(/-/g, " ")
      .replace(/^\w/, c => c.toUpperCase());
  };

  const title = getTitle();

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