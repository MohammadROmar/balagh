import { NextRequest, NextResponse } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';

import { routing, Locale } from './i18n/routing';

const intlMiddleware = createIntlMiddleware(routing);

const PUBLIC_ROUTES = ['/en', '/ar'];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtectedRoute =
    pathname.includes('/admin') || pathname.includes('/dashboard');
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  const pathnameParts = pathname.split('/');
  const locale = pathnameParts[1] as Locale;

  const token = request.cookies.get('access_token')?.value;

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL(`/${locale}`, request.nextUrl));
  }

  if (!isProtectedRoute && isPublicRoute && token) {
    return NextResponse.redirect(
      new URL(`/${locale}/redirect`, request.nextUrl),
    );
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
