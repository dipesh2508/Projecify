'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { 
  LayoutDashboard, 
  FolderKanban, 
  Users2, 
  Settings,
  PlusCircle,
  ListTodo
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import logoDark from '@/assets/projecify full logo.png'
import logoLight from '@/assets/projecify full logo white.png'

const navItems = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard
  },
  {
    title: "Projects",
    href: "/dashboard/projects",
    icon: FolderKanban
  },
  {
    title: "My Tasks",
    href: "/dashboard/my-tasks",
    icon: ListTodo
  },
  {
    title: "Team",
    href: "/dashboard/team",
    icon: Users2
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings
  }
]

export default function DashboardNav() {
  const pathname = usePathname()

  return (
    <div className="sticky top-0 h-screen w-64 border-r border-gray-800 dark:border-gray-800 bg-white/50 dark:bg-black/50 backdrop-blur-xl">
      <div className="flex h-full flex-col px-4 py-6">
        <Link href="/dashboard" className="relative w-48 h-12 px-2 mb-8">
          <Image
            src={logoDark}
            alt="Projecify"
            fill
            className="object-contain dark:hidden"
            priority
          />
          <Image
            src={logoLight}
            alt="Projecify"
            fill
            className="hidden object-contain dark:block"
            priority
          />
        </Link>

        <Button
          asChild
          className="mb-6 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-500 hover:to-secondary-500 text-white"
        >
          <Link href="/dashboard/projects/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Project
          </Link>
        </Button>

        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
                pathname === item.href 
                  ? "bg-gray-100 dark:bg-gray-800/50 text-gray-900 dark:text-white" 
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100/50 dark:hover:bg-gray-800/30 hover:text-gray-900 dark:hover:text-white"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}