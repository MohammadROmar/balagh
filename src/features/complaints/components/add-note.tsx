'use client';

import { useActionState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import AddNoteIcon from '@/assets/icons/add-note';
import NoteIcon from '@/assets/icons/note';
import FormErrors from '@/shared/components/form-errors';
import Button from '@/shared/components/button';
import { addComplaintNote } from '../api/add-note';

type Props = { id: string };

function AddNote({ id }: Props) {
  const t = useTranslations('complaintsPage.details');

  const action = addComplaintNote.bind(null, id);

  const [state, formAction, pending] = useActionState(action, {
    id: '',
    message: undefined,
    note: '',
  });

  useEffect(() => {
    if (state.message === 'success') {
      toast.success(t('noteAddedSuccessfully'), {
        classNames: {
          title: 'text-heading!',
          toast:
            'bg-secondary-background! rounded-2xl! border-gray-300! dark:border-gray-600!',
          icon: 'text-success',
        },
      });
    }
  }, [state.id, state.message, t]);

  return (
    <form action={formAction} className="w-full space-y-1">
      <label htmlFor="note" className="flex items-center gap-2 lg:text-sm">
        <span>
          <NoteIcon className="size-5 lg:size-4" />
        </span>
        <span>{t('addNoteTitle')}</span>
      </label>
      <textarea
        rows={4}
        id="note"
        name="note"
        required
        defaultValue={state.note}
        placeholder={t('addNote')}
        className="input bg-primary-background w-full lg:text-sm"
      />
      {state.message === 'invalid-input' && (
        <p className="text-error text-sm">{t('invalid-input')}</p>
      )}

      <div className="flex justify-end">
        <Button
          pending={pending}
          className="flex items-center gap-2 max-lg:w-fit lg:justify-center"
        >
          <span>
            <AddNoteIcon className="size-5" />
          </span>
          <span>{t('add')}</span>
        </Button>
      </div>
      <FormErrors message={state.message} className="lg:text-xs" />
    </form>
  );
}

export default AddNote;
