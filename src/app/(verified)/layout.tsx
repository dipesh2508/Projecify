import DashboardHeader from "@/components/dashboard/DashboardHeader"
import DashboardNav from "@/components/dashboard/DashboardNav"

export default function VerifiedLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Background effects */}
      <div className="fixed inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02] bg-grid" />
      <div className="fixed inset-0 bg-gradient-to-b from-white via-white/90 to-white dark:from-black dark:via-black/90 dark:to-black" />
      
      <div className="relative flex h-screen">
        <DashboardNav />
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          <main className="flex-1 overflow-y-auto p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}