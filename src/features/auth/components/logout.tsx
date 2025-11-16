'use client';

import { useActionState, useState } from 'react';
import { useTranslations } from 'next-intl';

import { useDialog } from '@/shared/hooks/use-dialog';
import LogoutIcon from '@/assets/icons/logout';
import Modal from '@/shared/components/modal';
import LoadingIndicator from '@/assets/icons/loading-indicator';
import { logoutAction } from '../api/logout';

export default function Logout() {
  const [, formAction, pending] = useActionState(logoutAction, null);

  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useDialog(isOpen);
  const t = useTranslations('sidebar');

  return (
    <>
      <Modal
        ref={dialogRef}
        title={t('logout')}
        description={t('logoutDescription')}
        titleStyles="text-error"
        onClose={() => setIsOpen(false)}
      >
        <form action={formAction} className="flex items-center gap-2">
          <button
            disabled={pending}
            className="button bg-error focus:outline-error w-fit"
            style={{ backgroundImage: 'none' }}
          >
            {pending ? <LoadingIndicator className="w-7" /> : t('logout')}
          </button>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            disabled={pending}
            className="button w-fit bg-none font-normal"
          >
            {t('cancel')}
          </button>
        </form>
      </Modal>

      <button
        onClick={() => setIsOpen(true)}
        className="text-error focus:outline-error button flex cursor-pointer gap-2 bg-none p-4 font-normal"
      >
        <span>
          <LogoutIcon className="size-6 shrink-0" />
        </span>
        <span>{t('logout')}</span>
      </button>
    </>
  );
}
