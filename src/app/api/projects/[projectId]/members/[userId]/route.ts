import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"

// PUT - Update member role
export async function PUT(
  req: Request,
  { params }: { params: { projectId: string; userId: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    const { role } = body

    const project = await prisma.project.findUnique({
      where: { id: params.projectId },
      include: { members: true }
    })

    if (!project) {
      return new NextResponse("Project not found", { status: 404 })
    }

    // Check if current user is owner or admin
    const currentUserRole = project.members.find(
      member => member.userId === session.user.id
    )?.role

    if (currentUserRole !== 'OWNER' && currentUserRole !== 'ADMIN') {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    // Cannot modify owner's role
    if (project.ownerId === params.userId) {
      return new NextResponse("Cannot modify owner's role", { status: 400 })
    }

    const updatedMember = await prisma.projectsOnUsers.update({
      where: {
        projectId_userId: {
          projectId: params.projectId,
          userId: params.userId
        }
      },
      data: { role },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          }
        }
      }
    })

    return NextResponse.json(updatedMember)
  } catch (error) {
    console.error("[MEMBER_PUT]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

// DELETE - Remove member from project
export async function DELETE(
  req: Request,
  { params }: { params: { projectId: string; userId: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const project = await prisma.project.findUnique({
      where: { id: params.projectId },
      include: { members: true }
    })

    if (!project) {
      return new NextResponse("Project not found", { status: 404 })
    }

    // Check if current user is owner or admin
    const currentUserRole = project.members.find(
      member => member.userId === session.user.id
    )?.role

    if (currentUserRole !== 'OWNER' && currentUserRole !== 'ADMIN') {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    // Cannot remove owner
    if (project.ownerId === params.userId) {
      return new NextResponse("Cannot remove project owner", { status: 400 })
    }

    await prisma.projectsOnUsers.delete({
      where: {
        projectId_userId: {
          projectId: params.projectId,
          userId: params.userId
        }
      }
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error("[MEMBER_DELETE]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}