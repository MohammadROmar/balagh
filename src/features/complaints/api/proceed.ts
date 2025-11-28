'use server';

import { cookies } from 'next/headers';
import { updateTag } from 'next/cache';

import type { ActionMessage } from '@/core/models/action-message';

type ProceedComplaintActionState = { id: string; message: ActionMessage };

export async function proceedComplaint(
  data: { id: string; rowVersion: string },
  prevState: ProceedComplaintActionState,
): Promise<ProceedComplaintActionState> {
  try {
    const token = (await cookies()).get('access_token')?.value;

    const response = await fetch(
      `${process.env.BACKEND_BASE_URL}/api/Complaints/ProceedComplaint/${data.id}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ rowVersion: data.rowVersion }),
      },
    );

    if (!response.ok) {
      return {
        id: prevState.id,
        message: response.status === 401 ? 'invalid-role' : 'failure',
      };
    }

    updateTag(`complaint-${data.id}`);
    updateTag(`complaints`);
  } catch (e) {
    console.error(e);
    return { id: prevState.id, message: 'server-error' };
  }

  return { id: Date.now().toString(), message: 'success' };
}
