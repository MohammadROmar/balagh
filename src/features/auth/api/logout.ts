'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getLocale } from 'next-intl/server';

export async function logoutAction() {
  const cookieStore = await cookies();

  cookieStore.delete({ name: 'access_token', path: '/' });
  cookieStore.delete({ name: 'refresh_token', path: '/' });

  const locale = await getLocale();
  redirect(`/${locale}`);
}
