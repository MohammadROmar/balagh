import { getLocale } from 'next-intl/server';

import ComplaintDetailsContainer from './details-container';
import NoteIcon from '@/assets/icons/note';
import { formatDate } from '@/shared/utils/format-date';
import type { Note } from '../models/complaint';
import type { TFunction } from '@/shared/models/tfunction';

type ComplaintNotesProps = {
  notes: Note[];
  t: TFunction<'complaintsPage.details'>;
};

async function ComplaintNotes({ t, notes }: ComplaintNotesProps) {
  const locale = await getLocale();

  return (
    <ComplaintDetailsContainer title={t('notes')} icon={NoteIcon}>
      <ul className="space-y-2">
        {notes.map((note) => (
          <li
            key={`complaint-note-${note.id}`}
            className="bg-primary-background space-y-0.5 rounded-2xl px-4 py-2"
          >
            <div className="flex items-center justify-between gap-4">
              <h4 className="text-heading font-medium">{note.userName}</h4>
              <time
                dateTime={note.createdAt}
                className="text-secondary text-sm"
              >
                {formatDate(new Date(note.createdAt), locale)}
              </time>
            </div>
            <p className="text-secondary text-sm">{note.noteBody}</p>
          </li>
        ))}
      </ul>
    </ComplaintDetailsContainer>
  );
}

export default ComplaintNotes;
