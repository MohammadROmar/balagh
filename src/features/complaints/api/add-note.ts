'use server';

import { cookies } from 'next/headers';

import { ActionMessage } from '@/config/models/action-message';
import { isValidText } from '@/shared/utils/validators';

type ComplaintNote = { complaintID: string; note?: string };
type AddComplaintNoteActionState = {
  message: ActionMessage | undefined;
} & ComplaintNote;

export async function addComplaintNote(
  prevState: AddComplaintNoteActionState,
  formData: FormData,
): Promise<AddComplaintNoteActionState> {
  const note = formData.get('note') as string;

  if (!isValidText(note)) {
    return {
      message: 'invalid-input',
      complaintID: prevState.complaintID,
      note,
    };
  }

  try {
    const token = (await cookies()).get('access_token')?.value;

    const response = await fetch(
      `${process.env.BACKEND_BASE_URL}/api/Complaints/${prevState.complaintID}/notes/add`,
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
      return { note, complaintID: prevState.complaintID, message: 'failure' };
    }
  } catch (e) {
    console.log(e);
    return {
      note,
      complaintID: prevState.complaintID,
      message: 'server-error',
    };
  }

  return { message: 'success', note: '', complaintID: prevState.complaintID };
}
