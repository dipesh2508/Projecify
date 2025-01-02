"use client"

import { useApi } from "@/hooks/useApi"
import { Card } from "@/components/ui/card"
import { ProjectStatus, TaskStatus, Priority } from "@prisma/client"
import MotionDiv from "@/components/animations/MotionDiv"
import { useToast } from "@/hooks/use-toast"
import Loader from "@/components/shared/Loader"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { PlusCircle, Clock, AlertCircle } from "lucide-react"
import Image from "next/image"
import { DashboardSkeleton } from "@/components/dashboard/DashboardSkeleton"

type Task = {
  id: string
  title: string
  status: TaskStatus
  priority: Priority
  dueDate: Date | null
}

type Project = {
  id: string
  name: string
  description: string | null
  status: ProjectStatus
  createdAt: Date
  updatedAt: Date
  dueDate: Date | null
  tasks: Task[]
  members: {
    user: {
      id: string
      name: string | null
      image: string | null
    }
    role: string
  }[]
}

export default function DashboardPage() {
  const router = useRouter()
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
    return <DashboardSkeleton />
  }

  // Calculate statistics with proper checks
  const urgentTasks = projects.flatMap(p => p.tasks || []).filter(t => t?.priority === Priority.URGENT).length

  const upcomingDeadlines = projects.filter(p => {
    if (!p?.dueDate) return false
    const dueDate = new Date(p.dueDate)
    if (!(dueDate instanceof Date && !isNaN(dueDate.getTime()))) return false
    
    const daysUntilDue = Math.ceil(
      (dueDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    )
    return daysUntilDue <= 7 && daysUntilDue > 0
  }).length

  if (projects.length === 0) {
    return (
      <div className="flex flex-col gap-6 p-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Welcome to your project dashboard
          </p>
        </div>

        <Card className="p-12">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="rounded-full bg-gray-100 dark:bg-gray-800 p-3 mb-4">
              <PlusCircle className="h-6 w-6 text-gray-500 dark:text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No Projects Found</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 max-w-sm">
              You don&apos;t have any projects yet. Create a new project or ask a project admin to add you to their project.
            </p>
            <div className="flex gap-2">
              <Button
                onClick={() => router.push("/dashboard/projects/new")}
                size="sm"
              >
                Create New Project
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push("/dashboard/my-tasks")}
                size="sm"
              >
                View All Tasks
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <MotionDiv 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >

      {/* Project Statistics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-8">
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
          title="Not Started"
          value={projects.filter(p => p.status === ProjectStatus.NOT_STARTED).length}
          gradient="from-gray-600 to-slate-600"
        />
      </div>

      {/* Alerts and Deadlines */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="h-5 w-5 text-red-500" />
            <h2 className="text-lg font-semibold">Urgent Tasks</h2>
          </div>
          <p className="text-3xl font-bold">{urgentTasks}</p>
          <p className="text-sm text-gray-500 mt-2">Tasks marked as urgent across all projects</p>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="h-5 w-5 text-yellow-500" />
            <h2 className="text-lg font-semibold">Upcoming Deadlines</h2>
          </div>
          <p className="text-3xl font-bold">{upcomingDeadlines}</p>
          <p className="text-sm text-gray-500 mt-2">Projects due within the next 7 days</p>
        </Card>
      </div>

      {/* Recent Projects */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Recent Projects</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects
            .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
            .slice(0, 3)
            .map(project => (
              <Card 
                key={project.id} 
                className="p-6 cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => router.push(`/dashboard/projects/${project.id}`)}
              >
                <h3 className="font-semibold mb-2">{project.name}</h3>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                  {project.description || 'No description'}
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex -space-x-2">
                    {project.members?.slice(0, 3).map(member => (
                      <Image
                        key={member.user.id}
                        src={member.user.image || '/placeholder-avatar.png'}
                        alt={member.user.name || 'Team member'}
                        className="w-8 h-8 rounded-full border-2 border-white"
                        width={40}
                        height={40}
                      />
                    ))}
                    {(project.members?.length || 0) > 3 && (
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm">
                        +{(project.members?.length || 0) - 3}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">
                      {project.tasks?.length || 0} tasks
                    </span>
                  </div>
                </div>
              </Card>
            ))}
        </div>
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