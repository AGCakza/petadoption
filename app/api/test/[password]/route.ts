import { NextRequest, NextResponse } from "next/server"
import bcrypt from 'bcrypt'

export async function GET(_req: NextRequest, { params }: { params: { password: string }}) {
    
    const salt = await bcrypt.genSalt(10)
    const hashed = bcrypt.hashSync(params.password, salt)
    return NextResponse.json({
        status: 'OK',
        data: {
            hashed
        }
    })
}