import { authOptions } from "@/pages/api/auth/[...nextauth]"
import dbConnect from "@/db/dbConnect"
import { petServices, userServices } from "@/db/services"
import mongoose from "mongoose"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"
import { IPet } from "@/db/models/pet.model"
const fs = require('fs')


export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions)
    if(session!.user) {
        await dbConnect()
        const data = await petServices.getPets(0, 0, session!.user.id)
        return NextResponse.json({ status: 'OK', data: {
            pets: data,
            meta: {
                page: 1,
                perPage: 5
            }
        } })
    } else {
        return NextResponse.json({ status: 'Not authorized!' }, { status: 401 })
    }
}

export async function POST(_req: NextRequest) {
    const session = await getServerSession(authOptions)
    if(session!.user) {
        await dbConnect()
        const body: any = {}
        const req = await _req.formData()
        for (var pair of Array.from(req.entries())) {
            body[pair[0]] = pair[1]
        }
        if(body.avatar) {
            const name = Date.now() + '.' + body.avatar.type.split('/')[1]
            const buffer = Buffer.from(await body.avatar.arrayBuffer())
            body.avatar = 'uploads/' + name
            fs.writeFile(body.avatar, buffer, (err: any) => console.log(err))
        }
        console.log(body)

        const res = await petServices.createPet(body)
        return NextResponse.json({ status: 'OK', data: res })
    } else {
        return NextResponse.json({ status: 'Not authorized!' }, { status: 401 })
    }
}