'use server';

import { isValidEmail, isValidPassword } from '@/shared/utils/validators';

type LoginCredentials = { email?: string; password?: string };
type LoginErrors = Partial<Record<keyof LoginCredentials, boolean>>;

type LoginActionState = {
  message: string | undefined;
  errors: LoginErrors;
} & LoginCredentials;

export async function loginAction(
  prevState: LoginActionState,
  formData: FormData,
): Promise<LoginActionState> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const errors: LoginErrors = {
    email: !isValidEmail(email),
    password: !isValidPassword(password),
  };

  if (Object.keys(errors).length > 0) {
    return { message: 'invalid-input', errors, email, password };
  }

  return { message: 'success', errors, email, password };
}
