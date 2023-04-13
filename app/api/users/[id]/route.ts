import dbConnect from "@/db/dbConnect"
import { userServices } from "@/db/services"
import mongoose from "mongoose"
import { NextResponse } from "next/server"

export async function GET(_req: Request, { params }) {
    await dbConnect()
    const data = await userServices.getUser(params.id)
    return NextResponse.json({ status: 'OK', data })
}

export async function PUT(_req: Request, { params }) {
    await dbConnect()
    const req = await _req.json()
    const res = await userServices.updateUser(params.id, req)
    return NextResponse.json({ status: 'OK', data: req, mdb: res })
}