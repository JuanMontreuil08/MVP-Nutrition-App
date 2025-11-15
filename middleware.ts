import { type NextRequest, NextResponse } from 'next/server';

// export function middleware(request: NextRequest) {
//   // Middleware temporarily disabled - auth handled client-side
// }

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
