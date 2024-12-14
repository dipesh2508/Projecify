import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"

// GET - Get a specific project
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
      where: {
        id: params.projectId,
      },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          }
        },
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
        },
        tasks: {
          include: {
            assignedTo: {
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

    // Check if user has access to this project
    const hasAccess = project.ownerId === session.user.id || 
      project.members.some(member => member.userId === session.user.id)

    if (!hasAccess) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    return NextResponse.json(project)
  } catch (error) {
    console.error("[PROJECT_GET]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

// PUT - Update a project
export async function PUT(
  req: Request,
  { params }: { params: { projectId: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    const { name, description, status, dueDate } = body

    const project = await prisma.project.findUnique({
      where: {
        id: params.projectId,
      },
      include: {
        members: true,
      }
    })

    if (!project) {
      return new NextResponse("Project not found", { status: 404 })
    }

    // Check if user is owner or admin
    const isOwnerOrAdmin = project.ownerId === session.user.id || 
      project.members.some(member => 
        member.userId === session.user.id && 
        (member.role === "OWNER" || member.role === "ADMIN")
      )

    if (!isOwnerOrAdmin) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const updatedProject = await prisma.project.update({
      where: {
        id: params.projectId,
      },
      data: {
        name,
        description,
        status,
        dueDate: dueDate ? new Date(dueDate) : null,
      },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          }
        },
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

    return NextResponse.json(updatedProject)
  } catch (error) {
    console.error("[PROJECT_PUT]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

// DELETE - Delete a project
export async function DELETE(
  req: Request,
  { params }: { params: { projectId: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const project = await prisma.project.findUnique({
      where: {
        id: params.projectId,
      }
    })

    if (!project) {
      return new NextResponse("Project not found", { status: 404 })
    }

    // Only owner can delete project
    if (project.ownerId !== session.user.id) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    await prisma.project.delete({
      where: {
        id: params.projectId,
      }
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error("[PROJECT_DELETE]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
} 