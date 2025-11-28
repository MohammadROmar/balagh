'use server';

import { cookies } from 'next/headers';
import { updateTag } from 'next/cache';

import { isValidText } from '@/shared/utils/validators';
import type { ActionMessage } from '@/core/models/action-message';

type ComplaintStatus = {
  id: string;
  message: ActionMessage;
  status: string;
};

export async function changeComplaintStatus(
  data: { id: string; rowVersion: string },
  prevState: ComplaintStatus,
  formData: FormData,
): Promise<ComplaintStatus> {
  const status = formData.get('status') as string;

  if (!isValidText(status)) {
    return { id: prevState.id, message: 'invalid-input', status };
  }

  try {
    const token = (await cookies()).get('access_token')?.value;

    const response = await fetch(
      `${process.env.BACKEND_BASE_URL}/api/Complaints/UpdateComplaint/${data.id}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          newStatus: status,
          rowVersion: data.rowVersion,
        }),
      },
    );

    if (!response.ok) {
      return {
        id: prevState.id,
        message: response.status === 401 ? 'invalid-role' : 'failure',
        status,
      };
    }

    updateTag(`complaint-${data.id}`);
    updateTag(`complaints`);
  } catch (e) {
    console.error(e);
    return { id: prevState.id, message: 'server-error', status };
  }

  return { id: Date.now().toString(), message: 'success', status };
}
