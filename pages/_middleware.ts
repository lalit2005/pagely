import { NextRequest, NextResponse } from 'next/server';

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const hostname = req.headers.get('host');

  const currentHost =
    process.env.NODE_ENV === 'production' && process.env.VERCEL === '1'
      ? hostname.replace(`.${process.env.NEXT_PUBLIC_ROOT_URL}`, '')
      : hostname.replace(`.localhost:3000`, '');

  if (pathname.startsWith(`/_sites`)) {
    // return new Response(null, { status: 404 });
    return NextResponse.rewrite(`/404`);
  }

  if (!pathname.includes('.') && !pathname.startsWith('/api')) {
    if (
      currentHost == 'localhost:3000' ||
      currentHost == process.env.NEXT_PUBLIC_ROOT_URL
    ) {
      return NextResponse.next();
    }
    console.log({ currentHost, pathname, hostname });

    return NextResponse.rewrite(`/_sites/${currentHost}${pathname}`);
  }
}
