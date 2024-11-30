import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import prisma from "@/lib/prisma"

export async function DELETE() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    // Delete the session from the database
    await prisma.session.deleteMany({
      where: {
        userId: session.user.id,
      },
    })

    return NextResponse.json({ message: "Session deleted successfully" })
  } catch (error) {
    console.error("[SESSION_DELETE_ERROR]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
} 