import { authOptions } from "@/pages/api/auth/[...nextauth]"
import dbConnect from "@/db/dbConnect"
import { friendshipServices, userServices } from "@/db/services"
import mongoose from "mongoose"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"

export async function POST(_req: NextRequest, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions)
    if(session && session.user) {
        await dbConnect()
        const friendship = await friendshipServices.addFriend({ between: [session!.user.id, params.id], from: session!.user.id })
        return NextResponse.json({ status: 'OK', friendship })
    } else return NextResponse.json({ status: 'Not authorized' }, { status: 401 })
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
    await dbConnect()
    const removing = await friendshipServices.removeFriendship(params.id)
    
    return NextResponse.json({ status: 'OK' })
}