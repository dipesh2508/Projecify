import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

// GET - Get all tasks assigned to a specific user
export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Only allow users to view their own assigned tasks
    if (params.userId !== session.user.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: params.userId,
      },
      select: {
        assignedTasks: {
          include: {
            project: {
              select: {
                id: true,
                name: true,
                status: true,
              }
            }
          },
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    return NextResponse.json(user.assignedTasks);
  } catch (error) {
    console.error("[USER_TASKS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}