"use client"

import { useEffect, useState } from "react"
import { useRouter,useSearchParams, redirect } from "next/navigation"
import { useSession } from "next-auth/react"
import { useToast } from "@/hooks/use-toast"
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import { useApi } from "@/hooks/useApi"
import { Skeleton } from "@/components/ui/skeleton"
import TeamMembers from "@/components/projects/team/TeamMembers"
import {
Select,
SelectContent,
SelectItem,
SelectTrigger,
SelectValue,
} from "@/components/ui/select"
import { User, Member, Project } from '@/components/projects/team/TeamMembers'
export default function TeamPage() {
const { data: session, status } = useSession()
const router = useRouter()
const searchParams = useSearchParams()
const { toast } = useToast()
const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)
    const {
    data: projects,
    error: projectsError,
    isLoading: projectsLoading,
    mutate: refetchProjects
} = useApi<Project[]>("/api/projects")
    const {
    data: selectedProject,
    isLoading: isProjectLoading,
    mutate: fetchProjectDetail
} = useApi<Project>(
    selectedProjectId ? `/api/projects/${selectedProjectId}` : "",
    {
        enabled: false,
        onError: (error) => {
            toast({
                title: "Error",
                description: "Failed to fetch project details",
                variant: "destructive",
            })
        }
    }
)
    useEffect(() => {
    if (status === "unauthenticated") {
        redirect("/auth/signin")
    }
}, [status])
    useEffect(() => {
    if (projects?.length) {
        const projectId = searchParams.get("projectId")
        if (projectId && projects.some(p => p.id === projectId)) {
            setSelectedProjectId(projectId)
        } else {
            setSelectedProjectId(projects[0].id)
        }
    }
}, [projects, searchParams])
    useEffect(() => {
    if (selectedProjectId) {
        fetchProjectDetail()
    }
}, [selectedProjectId])
    const handleProjectChange = async (projectId: string) => {
    setSelectedProjectId(projectId)
    router.push(`/dashboard/team?projectId=${projectId}`, { scroll: false })
}
    const handleProjectUpdate = async (updatedProject: Project) => {
    setSelectedProjectId(updatedProject.id)
    await fetchProjectDetail()
    await refetchProjects()
}
    if (projectsLoading) {
    return (
        <div className="container mx-auto py-6 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Team Management</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="max-w-xs">
                        <Skeleton className="h-10 w-full" />
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <Skeleton className="h-8 w-48" />
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <Skeleton className="h-20 w-full" />
                        <Skeleton className="h-20 w-full" />
                        <Skeleton className="h-20 w-full" />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
    return (
    <div className="container mx-auto py-6 space-y-6">
        <Card>
            <CardHeader>
                <CardTitle>Team Management</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="max-w-xs">
                    <Select
                        value={selectedProjectId || undefined}
                        onValueChange={handleProjectChange}
                        disabled={isProjectLoading}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select a project" />
                        </SelectTrigger>
                        <SelectContent>
                            {projects?.map((project) => (
                                <SelectItem key={project.id} value={project.id}>
                                    {project.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </CardContent>
        </Card>
            {selectedProject && (
            <Card>
                <CardHeader>
                    <CardTitle>Team Members - {selectedProject.name}</CardTitle>
                </CardHeader>
                <CardContent>
                    <TeamMembers
                        project={selectedProject}
                        currentUserId={session?.user?.id || ""}
                        isOwnerOrAdmin={
                            selectedProject.ownerId === session?.user?.id ||
                            selectedProject.members.some(
                                (member) =>
                                    member.userId === session?.user?.id &&
                                    (member.role === "OWNER" || member.role === "ADMIN")
                            )
                        }
                        onUpdate={handleProjectUpdate}
                    />
                </CardContent>
            </Card>
        )}
    </div>
)
}