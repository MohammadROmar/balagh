import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function DELETE() {
  const cookieStore = await cookies();

  cookieStore.delete({ name: 'access_token', path: '/' });
  cookieStore.delete({ name: 'refresh_token', path: '/' });

  return NextResponse.json({ success: true }, { status: 200 });
}
