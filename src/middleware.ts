import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const key = process.env.NEXTAUTH_URL?.startsWith("https://")
      ? "__Secure-next-auth.session-token"
      : "next-auth.session-token";
    const session = request.cookies.get(key)
    if (session) return NextResponse.next();
    return NextResponse.redirect(new URL('/', request.url))
}

export const config = {
    matcher: '/admin/:path*',
}
