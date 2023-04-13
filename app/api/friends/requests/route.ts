import { authOptions } from "@/pages/api/auth/[...nextauth]"
import dbConnect from "@/db/dbConnect"
import { friendshipServices, userServices } from "@/db/services"
import mongoose from "mongoose"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"
import { UserDocument } from "@/db/models/user.model"

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions)
    await dbConnect()
    const friends = await friendshipServices.getFriendRequests(0, 0, session!.user.id)
    const toSend = friends.map(item => ({...item, friend: (item.between as unknown as UserDocument[]).find(item => String(item._id) !== session!.user.id)}))
    return NextResponse.json({ status: 'OK', friends: toSend })
}