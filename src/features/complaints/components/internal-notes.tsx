'use client';

import { useActionState } from 'react';

import { Link } from '@/i18n/navigation';
import AddNoteIcon from '@/assets/icons/add-note';
import ComplaintDetailsContainer from './details-container';
import NoteIcon from '@/assets/icons/note';
import HistoryIcon from '@/assets/icons/history';
import { addComplaintNote } from '../api/add-note';
import { useTranslations } from 'next-intl';
import FormErrors from '@/shared/components/form-errors';

type Props = { id: string };

function ComplaintInternalNotes({ id }: Props) {
  const t = useTranslations('complaintsPage.details');

  const [state, formAction, pending] = useActionState(addComplaintNote, {
    complaintID: id,
    message: undefined,
  });

  return (
    <ComplaintDetailsContainer title={t('internalNotes')} icon={NoteIcon}>
      <form action={formAction} className="w-full">
        <textarea
          rows={4}
          id="note"
          name="note"
          defaultValue={state.note}
          placeholder={t('addInternalNotes')}
          className="input w-full"
        />
        <FormErrors message={state.message} />

        <div className="mt-4 flex items-center justify-between gap-4">
          <Link
            href={`/admin/complaints/${id}/notes`}
            className="text-teal flex items-center gap-2"
          >
            <span>
              <HistoryIcon className="size-5" />
            </span>
            <span>{t('showAllNotes')}</span>
          </Link>

          <button
            disabled={pending}
            className="button flex w-fit items-center gap-2"
          >
            <span>
              <AddNoteIcon className="size-5" />
            </span>
            <span>{t('add')}</span>
          </button>
        </div>
      </form>
    </ComplaintDetailsContainer>
  );
}

export default ComplaintInternalNotes;
