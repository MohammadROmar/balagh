'server-only';

import { cookies } from 'next/headers';

import { get } from '../../../shared/api/get';
import type { User } from '@/core/models/user';

export async function getSession() {
  const cookieStore = await cookies();

  const refreshToken = cookieStore.get('refresh_token')?.value;

  if (!refreshToken) return null;

  try {
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
