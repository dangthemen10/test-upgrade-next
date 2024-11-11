import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  console.log('Middleware running for:', request.nextUrl.pathname);
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/search')) {
    const newPathname = pathname.replace('/search', '');
    const url = request.nextUrl.clone();
    url.pathname = newPathname

    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}


export const config = {
  matcher: ['/search/:path*', '/api/post', '/_next/static/:path*'],
}