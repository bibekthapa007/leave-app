import { headers } from 'next/headers';
('use server');
import type { NextRequest } from 'next/server';

import paths from '@/utils/path';

const unAuthenticatedRoutes = [paths.signin, paths.signup];

export function middleware(request: NextRequest) {
  const session = request.cookies.get('session')?.value;
  const pathname = request.nextUrl.pathname;

  // if (session && unAuthenticatedRoutes.includes(pathname)) {
  //   return Response.redirect(new URL('/', request.url));
  // }

  if (!session && !unAuthenticatedRoutes.includes(pathname)) {
    return Response.redirect(new URL('/signup', request.url));
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
