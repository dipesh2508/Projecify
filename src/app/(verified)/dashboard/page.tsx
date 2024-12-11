"use client"

import { useApi } from "@/hooks/useApi"
import { Card } from "@/components/ui/card"
import { ProjectStatus } from "@prisma/client"
import MotionDiv from "@/components/animations/MotionDiv"
import { useToast } from "@/hooks/use-toast"
import Loader from "@/components/shared/Loader"

type Project = {
  id: string
  title: string
  description: string
  status: ProjectStatus
  createdAt: Date
  updatedAt: Date
  userId: string
  teamId: string | null
}

export default function DashboardPage() {
  const { toast } = useToast()
  
  const { 
    data: projects = [], 
    isLoading,
  } = useApi<Project[]>('/api/projects', {
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error loading projects",
        description: "Please try again later or contact support if the problem persists."
      })
      console.error('Error fetching projects:', error)
    }
  })

  if(isLoading || !projects){
    return <Loader />
  }

  return (
    <MotionDiv 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <ProjectStatusCard
          title="Active Projects"
          value={projects.filter(p => p.status === ProjectStatus.IN_PROGRESS).length}
          gradient="from-blue-600 to-indigo-600"
        />
        <ProjectStatusCard
          title="Completed"
          value={projects.filter(p => p.status === ProjectStatus.COMPLETED).length}
          gradient="from-green-600 to-emerald-600"
        />
        <ProjectStatusCard
          title="On Hold"
          value={projects.filter(p => p.status === ProjectStatus.ON_HOLD).length}
          gradient="from-yellow-600 to-orange-600"
        />
        <ProjectStatusCard
          title="Total Projects"
          value={projects.length}
          gradient="from-primary-600 to-secondary-600"
        />
      </div>
    </MotionDiv>
  )
}

function ProjectStatusCard({ 
  title, 
  value, 
  gradient 
}: { 
  title: string
  value: number
  gradient: string 
}) {
  return (
    <Card className="relative group overflow-hidden">
      <div className="absolute inset-0 bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl" />
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 dark:group-hover:opacity-10 transition-opacity duration-500`} />
      <div className="relative p-6 flex flex-col">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{value}</p>
      </div>
    </Card>
  )
}