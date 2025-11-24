'use server';

import { cookies } from 'next/headers';
import { updateTag } from 'next/cache';

import { isValidText } from '@/shared/utils/validators';
import type { ActionMessage } from '@/core/models/action-message';

type RequestAdditionalInfoActionState = {
  id: string;
  message: ActionMessage;
  data: string;
};

export async function requestAdditionalInfo(
  id: string,
  prevState: RequestAdditionalInfoActionState,
  formData: FormData,
): Promise<RequestAdditionalInfoActionState> {
  const requestMessage = formData.get('requestMessage') as string;

  if (!isValidText(requestMessage)) {
    return {
      id: prevState.id,
      message: 'invalid-input',
      data: requestMessage,
    };
  }

  try {
    const token = (await cookies()).get('access_token')?.value;

    const response = await fetch(
      `${process.env.BACKEND_BASE_URL}/api/Complaints/RequestExtraInfromation/${id}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: requestMessage }),
      },
    );

    if (!response.ok) {
      return {
        id: prevState.id,
        message: response.status === 401 ? 'invalid-role' : 'failure',
        data: requestMessage,
      };
    }

    updateTag(`complaint-${id}`);
  } catch (e) {
    console.error(e);

    return {
      id: prevState.id,
      message: 'server-error',
      data: requestMessage,
    };
  }

  return { id: Date.now().toString(), message: 'success', data: '' };
}
