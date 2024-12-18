import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"

// GET - Get all members of a project
export async function GET(
  req: Request,
  { params }: { params: { projectId: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const project = await prisma.project.findUnique({
      where: { id: params.projectId },
      include: {
        members: {
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
        }
      }
    })

    if (!project) {
      return new NextResponse("Project not found", { status: 404 })
    }

    // Check if user has access to view members
    const isMember = project.members.some(member => member.userId === session.user.id)
    if (!isMember) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    return NextResponse.json(project.members)
  } catch (error) {
    console.error("[MEMBERS_GET]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

// POST - Add a new member to the project
export async function POST(
  req: Request,
  { params }: { params: { projectId: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    const { email, role } = body

    // Find the user by email
    const userToAdd = await prisma.user.findUnique({
      where: { email }
    })

    if (!userToAdd) {
      return new NextResponse("User not found", { status: 404 })
    }

    // Check if the current user is owner or admin
    const project = await prisma.project.findUnique({
      where: { id: params.projectId },
      include: {
        members: true
      }
    })

    if (!project) {
      return new NextResponse("Project not found", { status: 404 })
    }

    const currentUserRole = project.members.find(
      member => member.userId === session.user.id
    )?.role

    if (currentUserRole !== 'OWNER' && currentUserRole !== 'ADMIN') {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    // Check if user is already a member
    const existingMember = project.members.find(
      member => member.userId === userToAdd.id
    )

    if (existingMember) {
      return new NextResponse("User is already a member", { status: 400 })
    }

    // Add the new member
    const newMember = await prisma.projectsOnUsers.create({
      data: {
        projectId: params.projectId,
        userId: userToAdd.id,
        role: role || 'MEMBER'
      },
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

    return NextResponse.json(newMember)
  } catch (error) {
    console.error("[MEMBERS_POST]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

// DELETE - Remove member from project
export async function DELETE(
  req: Request,
  { params }: { params: { projectId: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    const { userId } = body

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
    if (project.ownerId === userId) {
      return new NextResponse("Cannot remove project owner", { status: 400 })
    }

    await prisma.projectsOnUsers.delete({
      where: {
        projectId_userId: {
          projectId: params.projectId,
          userId: userId
        }
      }
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error("[MEMBER_DELETE]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

// PATCH - Update member role
export async function PATCH(
  req: Request,
  { params }: { params: { projectId: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    const { userId, role } = body

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
    if (project.ownerId === userId) {
      return new NextResponse("Cannot modify owner's role", { status: 400 })
    }

    const updatedMember = await prisma.projectsOnUsers.update({
      where: {
        projectId_userId: {
          projectId: params.projectId,
          userId: userId
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
    console.error("[MEMBER_PATCH]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}