"use client"

import { useState } from "react"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Loader2, MoreVertical, UserCog, UserMinus } from "lucide-react"

export interface User {
    id: string
    name: string
    email: string
    image: string | null
}

export interface Member {
    userId: string
    role: string
    user: User
}

export interface Project {
    id: string
    name: string
    ownerId: string
    owner: User
    members: Member[]
}

interface TeamMembersProps {
    project: Project
    currentUserId: string
    isOwnerOrAdmin: boolean
    onUpdate: (project: Project) => void
}

export default function TeamMembers({
    project,
    currentUserId,
    isOwnerOrAdmin,
    onUpdate,
}: TeamMembersProps) {
    const { toast } = useToast()
    const [email, setEmail] = useState("")
    const [role, setRole] = useState("MEMBER")
    const [loadingMemberId, setLoadingMemberId] = useState<string | null>(null)
    const [isAddingMember, setIsAddingMember] = useState(false)

    const handleAddMember = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsAddingMember(true)
        try {
            const response = await fetch(`/api/projects/${project.id}/members`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, role })
            })

            if (!response.ok) throw new Error('Failed to add member')

            const newMember = await response.json()
            const updatedProject = {
                ...project,
                members: [...project.members, newMember]
            }
            onUpdate(updatedProject)
            setEmail("")
            toast({
                title: "Success",
                description: "Team member added successfully"
            })
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to add team member",
                variant: "destructive"
            })
        } finally {
            setIsAddingMember(false)
        }
    }

    const handleRemoveMember = async (userId: string) => {
        setLoadingMemberId(userId)
        try {
            const response = await fetch(`/api/projects/${project.id}/members`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId })
            })

            if (!response.ok) throw new Error('Failed to remove member')

            const updatedProject = {
                ...project,
                members: project.members.filter(m => m.userId !== userId)
            }
            onUpdate(updatedProject)
            toast({
                title: "Success",
                description: "Member removed successfully"
            })
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to remove member",
                variant: "destructive"
            })
        } finally {
            setLoadingMemberId(null)
        }
    }

    const handleUpdateRole = async (userId: string, newRole: string) => {
        setLoadingMemberId(userId)
        try {
            const response = await fetch(`/api/projects/${project.id}/members/${userId}`, {
                method: 'PUT',  // Changed to PUT to match the route handler
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ role: newRole })
            })
                if (!response.ok) {
                const error = await response.text()
                throw new Error(error || 'Failed to update role')
            }
                const updatedMember = await response.json()
            const updatedProject = {
                ...project,
                members: project.members.map(m =>
                    m.userId === userId ? { ...m, ...updatedMember } : m
                )
            }
            onUpdate(updatedProject)
            toast({
                title: "Success",
                description: "Role updated successfully"
            })
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.message || "Failed to update role",
                variant: "destructive"
            })
        } finally {
            setLoadingMemberId(null)
        }
    }

    const getRoleBadgeVariant = (role: string) => {
    switch (role) {
        case "OWNER":
            return "default"
        case "ADMIN":
            return "secondary"
        default:
            return "outline"
    }
}
    return (
    <div className="space-y-6">
        {isOwnerOrAdmin && (
            <form onSubmit={handleAddMember} className="space-y-4">
                <div className="flex gap-4">
                    <Input
                        type="email"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isAddingMember}
                    />
                    <Select
                        value={role}
                        onValueChange={setRole}
                        disabled={isAddingMember}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="MEMBER">Member</SelectItem>
                            <SelectItem value="ADMIN">Admin</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button type="submit" disabled={isAddingMember}>
                        {isAddingMember && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Add Member
                    </Button>
                </div>
            </form>
        )}
            <div className="space-y-4">
            {project.members.map((member) => (
                <div
                    key={member.userId}
                    className="group relative overflow-hidden bg-card rounded-lg border p-6 hover:shadow-md transition-all duration-200"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-100/50 to-gray-100/25 dark:from-gray-900/50 dark:to-gray-900/25 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Image
                                src={member.user.image || '/placeholder-avatar.png'}
                                alt={member.user.name || 'Team member'}
                                className="w-10 h-10 rounded-full border-2 border-background"
                                width={40}
                                height={40}
                            />
                            <div>
                                <p className="font-medium text-foreground">
                                    {member.user.name}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {member.user.email}
                                </p>
                            </div>
                        </div>
                            <div className="flex items-center gap-4">
                            <div className="flex gap-2">
                                <Badge variant={getRoleBadgeVariant(member.role)}>
                                    {member.role}
                                </Badge>
                                {member.userId === project.ownerId && (
                                    <Badge variant="secondary">Project Owner</Badge>
                                )}
                            </div>
                                {isOwnerOrAdmin && member.userId !== project.ownerId && (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-8 w-8 p-0 group-hover:opacity-100 transition-opacity duration-200"
                                            disabled={loadingMemberId === member.userId}
                                        >
                                            {loadingMemberId === member.userId ? (
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                            ) : (
                                                <MoreVertical className="h-4 w-4" />
                                            )}
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem
                                            onClick={() => handleUpdateRole(
                                                member.userId,
                                                member.role === "ADMIN" ? "MEMBER" : "ADMIN"
                                            )}
                                        >
                                            <UserCog className="mr-2 h-4 w-4" />
                                            Change to {member.role === "ADMIN" ? "Member" : "Admin"}
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            className="text-destructive"
                                            onClick={() => handleRemoveMember(member.userId)}
                                        >
                                            <UserMinus className="mr-2 h-4 w-4" />
                                            Remove Member
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
)
}