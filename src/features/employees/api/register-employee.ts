'use server';

import { cookies } from 'next/headers';

import {
  isValidEmail,
  isValidPassword,
  isValidPhoneNumber,
  isValidText,
} from '@/shared/utils/validators';
import type { ActionMessage } from '@/core/models/action-message';

type EmployeeCredentials = {
  username: string;
  phoneNumber: string;
  email: string;
  password: string;
  govermentalEntity: string;
};
type EmployeeCredentialsErrors = Partial<
  Record<keyof EmployeeCredentials, boolean>
>;
type RegisterEmployeeActionState = {
  id: string;
  message: ActionMessage;
  errors?: EmployeeCredentialsErrors;
  defaultValues?: EmployeeCredentials;
};

export async function registerEmployeeAction(
  prevState: RegisterEmployeeActionState,
  formData: FormData,
): Promise<RegisterEmployeeActionState> {
  const credentials = Object.fromEntries(
    formData.entries(),
  ) as EmployeeCredentials;

  const errors = validateEmployeeCredentials(credentials);

  if (Object.values(errors).includes(true)) {
    return {
      id: prevState.id,
      message: 'invalid-input',
      errors,
      defaultValues: credentials,
    };
  }

  try {
    const accessToken = (await cookies()).get('access_token')?.value;

    const fd = new FormData();
    fd.append('governmentalEntityId', credentials.govermentalEntity);
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
      return {
        id: prevState.id,
        message: response.status === 401 ? 'invalid-role' : 'failure',
        errors,
        defaultValues: credentials,
      };
    }
  } catch (e) {
    console.error(e);
    return {
      id: prevState.id,
      message: 'server-error',
      errors,
      defaultValues: credentials,
    };
  }

  return { id: Date.now().toString(), message: 'success' };
}

function validateEmployeeCredentials(credentials: EmployeeCredentials) {
  return {
    username: !isValidText(credentials.username),
    phoneNumber: !isValidPhoneNumber(credentials.phoneNumber),
    email: !isValidEmail(credentials.email),
    password: !isValidPassword(credentials.password),
    govermentalEntity: !isValidText(credentials.govermentalEntity),
  } satisfies EmployeeCredentialsErrors;
}
