import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"

// GET - Get all tasks for a project
export async function GET(
	req: Request,
	{ params }: { params: { projectId: string } }
) {
	try {
		const session = await getServerSession(authOptions)
		
		if (!session?.user?.id) {
			return new NextResponse("Unauthorized", { status: 401 })
		}

		// Check if user has access to the project
		const project = await prisma.project.findFirst({
			where: {
				id: params.projectId,
				OR: [
					{ ownerId: session.user.id },
					{
						members: {
							some: {
								userId: session.user.id
							}
						}
					}
				]
			},
		})

		if (!project) {
			return new NextResponse("Project not found or unauthorized", { status: 404 })
		}

		const tasks = await prisma.task.findMany({
			where: {
				projectId: params.projectId
			},
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
		})

		return NextResponse.json(tasks)
	} catch (error) {
		console.error("[TASKS_GET]", error)
		return new NextResponse("Internal Error", { status: 500 })
	}
}

// POST - Create a new task
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
		const { title, description, status, priority, dueDate, assignedToId } = body

		// Check if user has access to create tasks in this project
		const project = await prisma.project.findFirst({
			where: {
				id: params.projectId,
				OR: [
					{ ownerId: session.user.id },
					{
						members: {
							some: {
								userId: session.user.id
							}
						}
					}
				]
			},
		})

		if (!project) {
			return new NextResponse("Project not found or unauthorized", { status: 404 })
		}

		if (!title) {
			return new NextResponse("Title is required", { status: 400 })
		}

		const task = await prisma.task.create({
			data: {
				title,
				description,
				status: status || "TODO",
				priority: priority || "MEDIUM",
				dueDate: dueDate ? new Date(dueDate) : null,
				assignedToId,
				projectId: params.projectId,
			},
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
		})

		return NextResponse.json(task)
	} catch (error) {
		console.error("[TASKS_POST]", error)
		return new NextResponse("Internal Error", { status: 500 })
	}
}