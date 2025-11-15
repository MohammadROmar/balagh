import { NextRequest, NextResponse } from 'next/server';
import createIntlProxy from 'next-intl/middleware';
import { routing } from './i18n/routing';

const PROTECTED_ROUTES = ['/dashboard', '/admin'];

function isProtectedRoute(pathname: string) {
  return PROTECTED_ROUTES.some((route) => pathname.startsWith(route));
}

const intlProxy = createIntlProxy(routing);

export default function middleware(request: NextRequest) {
  const intlResponse = intlProxy(request);

  if (intlResponse instanceof NextResponse && !intlResponse.ok) {
    return intlResponse;
  }

  return authProxy(request, intlResponse);
}

function authProxy(request: NextRequest, response: NextResponse | undefined) {
  const { pathname } = request.nextUrl;

  console.log(pathname);

  if (isProtectedRoute(pathname)) {
    const isAuthenticated = !!request.cookies.get('access_token')?.value;

    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return response || NextResponse.next();
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
