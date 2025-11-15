'use server';

import { cookies } from 'next/headers';
import { getLocale } from 'next-intl/server';

import { redirect } from '@/i18n/navigation';
import { isValidEmail, isValidPassword } from '@/shared/utils/validators';
import type { ActionMessage } from '@/config/models/action-message';

type LoginCredentials = { email?: string; password?: string };
type LoginErrors = Partial<Record<keyof LoginCredentials, boolean>>;
type LoginResponseData = {
  token: string;
  username: string;
  expires: number;
  refreshToken: string;
  role: string;
};

type LoginActionState = {
  message: ActionMessage;
  errors: LoginErrors;
} & LoginCredentials;

export async function loginAction(
  _: LoginActionState,
  formData: FormData,
): Promise<LoginActionState> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const errors: LoginErrors = {
    email: !isValidEmail(email),
    password: !isValidPassword(password),
  };

  if (errors.email || errors.password) {
    return { message: 'invalid-input', errors, email, password };
  }

  let redirectPath: string | null = null;

  try {
    const response = await fetch(
      `${process.env.BACKEND_BASE_URL}/api/users/login`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, deviceToken: '' }),
      },
    );

    if (!response.ok) {
      return { message: 'failure', errors, email, password };
    }

    const { role, token, refreshToken, expires } =
      (await response.json()) as LoginResponseData;

    if (!['Administrator', 'Employee'].includes(role)) {
      return { message: 'invalid-role', errors, email, password };
    }

    const cookieStore = await cookies();
    cookieStore.set({
      name: 'access_token',
      value: token,
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
      maxAge: expires * 60,
    });
    cookieStore.set({
      name: 'refresh_token',
      value: refreshToken,
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });
    cookieStore.set({
      name: 'role',
      value: role,
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    redirectPath = role === 'Administrator' ? '/admin' : '/dashboard';
  } catch (e) {
    console.log(e);

    return { message: 'server-error', errors, email, password };
  }

  if (redirectPath) {
    const locale = await getLocale();
    redirect({ locale, href: redirectPath });
  }

  return { message: 'success', errors, email, password };
}
