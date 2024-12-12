import { Suspense } from "react"
import ProjectsList from "@/components/projects/ProjectsList"
import { ProjectsListSkeleton } from "@/components/projects/ProjectsListSkeleton"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from 'next/link'

export default function ProjectsPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-muted-foreground">Manage and track your projects</p>
        </div>
        <Link href="/dashboard/projects/new">
            <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                New Project
            </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Suspense fallback={<ProjectsListSkeleton />}>
          <ProjectsList />
        </Suspense>
      </div>
    </div>
  )
}
