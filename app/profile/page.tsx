import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { getServerSession } from "next-auth"
import Link from "next/link"

async function getProfile() {
    const session = await getServerSession(authOptions)
    return session
}

export default async function ProfilePage() {
    const session = await getProfile()

    return (
        <div>
            Hello, {JSON.stringify(session)}
        </div>
    )
}