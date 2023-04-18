import { withAuth } from "next-auth/middleware"
import { NextRequest, NextResponse } from "next/server"

export default withAuth(
    function middleware(req) {
        if (req.nextUrl.pathname.startsWith("/admin") && req.nextauth.token?.role !== "admin") {
            return NextResponse.json({ status: 'Not allowed!' }, { status: 403 })
        }
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
    }
)

export const config = {
    matcher: [
        '/playdate/:path*',
        '/profile',
        '/profile/:path*',
        '/friends/:path*',
        '/admin/:path*',
        '/api/friends/:path*',
        '/api/pets/:path*',
        '/api/playdate/:path*',
        '/api/profile/:path*'
    ],
}