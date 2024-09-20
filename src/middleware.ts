import { NextFetchEvent, NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest, event: NextFetchEvent) {
    const url = request.nextUrl.clone();

    // Assuming token-based redirection logic
    const token = request.cookies.get('token');
    if (!token && url.pathname !== '/login') {

        url.pathname = '/login';
        return NextResponse.redirect(url);
    } else if (token && (url.pathname === '/login' || url.pathname === '/')) {

        url.pathname = '/dashboard';
        return NextResponse.redirect(url);
    }


    return NextResponse.next();
}
export const config = {
    matcher: "/",
};