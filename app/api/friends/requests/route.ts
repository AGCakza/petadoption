import { authOptions } from "@/pages/api/auth/[...nextauth]"
import dbConnect from "@/db/dbConnect"
import { friendshipServices, userServices } from "@/db/services"
import mongoose from "mongoose"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions)
    await dbConnect()
    let friends = await friendshipServices.getFriendRequests(0, 0, session?.user.id)
    friends = friends.map(item => ({...item, friend: item.between.find(item => String(item._id) !== session?.user.id)}))

    return NextResponse.json({ status: 'OK', friends })
}