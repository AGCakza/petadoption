import { authOptions } from "@/pages/api/auth/[...nextauth]"
import dbConnect from "@/db/dbConnect"
import { petServices, userServices } from "@/db/services"
import mongoose from "mongoose"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions)
    if(session!.user) {
        await dbConnect()
        const data = await petServices.getPets(0, 0, session!.user.id)
        return NextResponse.json({ status: 'OK', data })
    } else {
        return NextResponse.json({ status: 'Not authorized!' }, { status: 401 })
    }
}

export async function POST(_req: NextRequest) {
    const session = await getServerSession(authOptions)
    if(session!.user) {
        await dbConnect()
        const req = await _req.json()
        req.owner = session!.user.id
        delete req.email
        const res = await petServices.createPet(req)
        return NextResponse.json({ status: 'OK', data: req })
    } else {
        return NextResponse.json({ status: 'Not authorized!' }, { status: 401 })
    }
}