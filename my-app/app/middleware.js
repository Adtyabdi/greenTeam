import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req) {
  console.log('Middleware is called');
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    console.log('No token found, redirecting to login');
    const url = req.nextUrl.clone();
    url.pathname = '/'; // Halaman login Anda
    return NextResponse.redirect(url);
  }

  console.log('Token found, allowing access');
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/setPo/:path*'],
};
