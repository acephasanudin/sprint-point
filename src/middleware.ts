import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const session = request.cookies.get('next-auth.session-token')
    if (session) return NextResponse.next();
    return NextResponse.redirect(new URL('/', request.url))
}

export const config = {
    matcher: '/admin/:path*',
}
