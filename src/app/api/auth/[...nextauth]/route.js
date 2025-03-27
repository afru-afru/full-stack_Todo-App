import { NextResponse } from 'next/server';
import NextAuth from 'next-auth';
import { authOptions } from '@/lib/config/auth';

const handler = async (req, context) => {
  const { nextUrl } = req;
  const isSignup = nextUrl.searchParams.get('signup');

  if (isSignup) {
    // Clone the request and add isSignup flag to body
    const newReq = new Request(req);
    const body = await req.json();
    body.isSignup = true;

    newReq.json = () => Promise.resolve(body);
    return NextAuth(authOptions).auth(newReq, context);
  }

  return NextAuth(authOptions)(req, context);
};

export { handler as GET, handler as POST };