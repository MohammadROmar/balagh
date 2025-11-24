'use server';

import { cookies } from 'next/headers';
import { updateTag } from 'next/cache';

import { ActionMessage } from '@/core/models/action-message';
import { isValidText } from '@/shared/utils/validators';

type AddComplaintNoteActionState = {
  id: string;
  message: ActionMessage | undefined;
  note: string;
};

export async function addComplaintNote(
  id: string,
  prevState: AddComplaintNoteActionState,
  formData: FormData,
): Promise<AddComplaintNoteActionState> {
  const note = formData.get('note') as string;

  if (!isValidText(note)) {
    return {
      id: prevState.id,
      message: 'invalid-input',
      note,
    };
  }

  try {
    const token = (await cookies()).get('access_token')?.value;

    const response = await fetch(
      `${process.env.BACKEND_BASE_URL}/api/Complaints/${id}/notes/add`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ noteBody: note }),
      },
    );

    if (!response.ok) {
      return {
        id: prevState.id,
        message: response.status === 401 ? 'invalid-role' : 'failure',
        note,
      };
    }

    updateTag(`complaint-${id}`);
  } catch (e) {
    console.error(e);
    return { id: prevState.id, message: 'server-error', note };
  }

  return { id: Date.now().toString(), message: 'success', note: '' };
}
