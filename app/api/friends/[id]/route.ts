import { authOptions } from "@/pages/api/auth/[...nextauth]"
import dbConnect from "@/db/dbConnect"
import { friendshipServices, userServices } from "@/db/services"
import mongoose from "mongoose"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"

export async function POST(_req: NextRequest, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions)
    await dbConnect()
    const friendship = await friendshipServices.addFriend({between: [session?.user.id, params.id], from: session?.user.id})

    return NextResponse.json({ status: 'OK', friendship })
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
    const removing = await friendshipServices.removeFriendship(params.id)
    
    return NextResponse.json({ status: 'OK' })
}