"use client"

import Link from "next/link"
import { format } from "date-fns"
import { useApi } from "@/hooks/useApi"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ProjectStatusBadge } from "@/components/projects/ProjectStatusBadge"
import { ProjectsListSkeleton } from "./ProjectsListSkeleton"

interface Project {
  id: string
  name: string
  description: string | null
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' | 'ON_HOLD'
  dueDate: string | null
  owner: {
    id: string
    name: string | null
    email: string
    image: string | null
  }
  _count: {
    tasks: number
  }
}

export default function ProjectsList() {
  const { data: projects, error, isLoading } = useApi<Project[]>('/api/projects')

  if (isLoading) {
    return <ProjectsListSkeleton />
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        Error loading projects: {error.message}
      </div>
    )
  }

  if (!projects?.length) {
    return (
      <div className="col-span-full text-center text-muted-foreground">
        No projects found. Create your first project to get started!
      </div>
    )
  }

  return (
    <>
      {projects.map((project) => (
        <Link href={`/dashboard/projects/${project.id}`} key={project.id}>
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">{project.name}</h2>
                <ProjectStatusBadge status={project.status} />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground line-clamp-2">
                {project.description || "No description provided"}
              </p>
              
              <div className="mt-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Owner:</span>
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={project.owner.image || ''} alt={project.owner.name || ''} />
                    <AvatarFallback>
                      {project.owner.name?.charAt(0) || project.owner.email.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm">{project.owner.name}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Tasks:</span>
                <Badge variant="secondary">{project._count.tasks}</Badge>
              </div>
              {project.dueDate && (
                <div className="text-sm text-muted-foreground">
                  Due: {format(new Date(project.dueDate), "MMM d, yyyy")}
                </div>
              )}
            </CardFooter>
          </Card>
        </Link>
      ))}
    </>
  )
} 