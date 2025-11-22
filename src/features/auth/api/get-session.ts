'server-only';

import { cookies } from 'next/headers';

import { get } from '../../../shared/api/get';
import type { User } from '@/core/models/user';

export async function getSession() {
  const cookieStore = await cookies();

  const token = cookieStore.get('access_token')?.value;
  const refreshToken = cookieStore.get('refresh_token')?.value;

  if (!refreshToken) return null;

  try {
    const refreshResponse = await fetch(
      `${process.env.BACKEND_BASE_URL}/api/users/token/refresh`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ refreshToken }),
      },
    );

    if (!refreshResponse.ok) {
      return null;
    }

    const user = await get<User>('/api/users/current');

    if (user.message === 'success') {
      return user.data;
    } else {
      return null;
    }
  } catch (e) {
    console.error(e);

    return null;
  }
}
