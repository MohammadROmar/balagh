import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get('access_token')?.value;
  const refreshToken = cookieStore.get('refresh_token')?.value;

  if (!refreshToken) {
    return NextResponse.json({ error: 'refresh-failed' }, { status: 401 });
  }

  try {
    const response = await fetch(
      `${process.env.BACKEND_BASE_URL}/api/users/token/refresh`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ refreshToken }),
      },
    );

    if (!response.ok) {
      return NextResponse.json({ error: 'refresh-failed' }, { status: 401 });
    }

    const data = await response.json();

    const res = NextResponse.json({ success: true }, { status: 200 });

    res.cookies.set({
      name: 'refresh_token',
      value: data.refreshToken,
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 2,
    });
    res.cookies.set({
      name: 'access_token',
      value: data.token,
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
      maxAge: 30 * 60,
    });

    return res;
  } catch (e) {
    console.log(e);

    return NextResponse.json({ error: 'refresh-failed' }, { status: 401 });
  }
}
