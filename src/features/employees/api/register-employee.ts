'use server';

import { cookies } from 'next/headers';

import {
  isValidEmail,
  isValidPassword,
  isValidPhoneNumber,
  isValidText,
} from '@/shared/utils/validators';
import type { ActionMessage } from '@/config/models/action-message';

type EmployeeCredentials = {
  username: string;
  phoneNumber: string;
  email: string;
  password: string;
};
type EmployeeCredentialsErrors = Partial<
  Record<keyof EmployeeCredentials, boolean>
>;
type RegisterEmployeeActionState = {
  message: ActionMessage;
  errors?: EmployeeCredentialsErrors;
  defaultValues?: EmployeeCredentials;
};

export async function registerEmployeeAction(
  _: RegisterEmployeeActionState,
  formData: FormData,
): Promise<RegisterEmployeeActionState> {
  const credentials = Object.fromEntries(
    formData.entries(),
  ) as EmployeeCredentials;

  const errors = validateEmployeeCredentials(credentials);

  if (Object.values(errors).includes(true)) {
    return { message: 'invalid-input', errors, defaultValues: credentials };
  }

  try {
    const accessToken = (await cookies()).get('access_token');

    const fd = new FormData();
    fd.append('governmentalEntityId', '1');
    fd.append('userName', credentials.username);
    fd.append('email', credentials.email);
    fd.append('password', credentials.password);
    fd.append('phoneNumber', credentials.phoneNumber);
    fd.append('role', 'Employee');

    const response = await fetch(
      `${process.env.BACKEND_BASE_URL}/api/users/register`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: fd,
      },
    );

    if (!response.ok) {
      return { message: 'failure', errors, defaultValues: credentials };
    }
  } catch (e) {
    console.log(e);
    return { message: 'server-error', errors, defaultValues: credentials };
  }

  console.log('first');
  return { message: 'success', errors, defaultValues: credentials };
}

function validateEmployeeCredentials(credentials: EmployeeCredentials) {
  return {
    username: !isValidText(credentials.username),
    phoneNumber: !isValidPhoneNumber(credentials.phoneNumber),
    email: !isValidEmail(credentials.email),
    password: !isValidPassword(credentials.password),
  } satisfies EmployeeCredentialsErrors;
}
