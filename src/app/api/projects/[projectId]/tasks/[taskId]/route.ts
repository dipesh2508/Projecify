import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

// GET - Get a specific task
export async function GET(
  req: Request,
  { params }: { params: { taskId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const task = await prisma.task.findUnique({
      where: {
        id: params.taskId,
      },
      include: {
        project: {
          include: {
            members: true,
          },
        },
        assignedTo: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
    });

    if (!task) {
      return new NextResponse("Task not found", { status: 404 });
    }

    // Check if user has access to this task's project
    const hasAccess = task.project.members.some(
      (member) => member.userId === session.user.id
    );
    if (!hasAccess) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    return NextResponse.json(task);
  } catch (error) {
    console.error("[TASK_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// PUT - Update a task
export async function PUT(
  req: Request,
  { params }: { params: { taskId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { title, description, status, priority, dueDate, assignedToId } =
      body;

    const task = await prisma.task.findUnique({
      where: {
        id: params.taskId,
      },
      include: {
        project: {
          include: {
            members: true,
          },
        },
      },
    });

    if (!task) {
      return new NextResponse("Task not found", { status: 404 });
    }

    // Check if user has access to modify this task
    const hasAccess = task.project.members.some(
      (member) => member.userId === session.user.id
    );
    if (!hasAccess) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const updatedTask = await prisma.task.update({
      where: {
        id: params.taskId,
      },
      data: {
        title,
        description,
        status,
        priority,
        dueDate: dueDate ? new Date(dueDate) : null,
        assignedToId,
      },
      include: {
        assignedTo: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
    });

    return NextResponse.json(updatedTask);
  } catch (error) {
    console.error("[TASK_PUT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// DELETE - Delete a task
export async function DELETE(
  req: Request,
  { params }: { params: { taskId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const task = await prisma.task.findUnique({
      where: {
        id: params.taskId,
      },
      include: {
        project: {
          include: {
            members: true,
          },
        },
      },
    });

    if (!task) {
      return new NextResponse("Task not found", { status: 404 });
    }

    // Check if user has access to delete this task
    const hasAccess = task.project.members.some(
      (member) =>
        member.userId === session.user.id &&
        (member.role === "OWNER" || member.role === "ADMIN")
    );

    if (!hasAccess) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await prisma.task.delete({
      where: {
        id: params.taskId,
      },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("[TASK_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
