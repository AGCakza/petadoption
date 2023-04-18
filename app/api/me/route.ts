import dbConnect from "@/db/dbConnect"
import { User } from "@/db/models"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions)
    await dbConnect()
    const user = await User.findById(session?.user.id)
    return NextResponse.json({ status: 'OK', user })
}