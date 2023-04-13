import dbConnect from "@/db/dbConnect"
import { userServices } from "@/db/services"
import mongoose from "mongoose"
import { signIn } from "next-auth/react"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
    await dbConnect()
    const users = await userServices.getUsers()
    return NextResponse.json({ status: 'OK', users })
}

export async function POST(_req: Request) {
    await dbConnect()
    const req = await _req.json()
    const user = await userServices.createUser(req)
    return NextResponse.json({ status: 'OK', data: req })
}