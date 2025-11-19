'use client';

import { useActionState, useState } from 'react';
import { useTranslations } from 'next-intl';

import { useDialog } from '@/shared/hooks/use-dialog';
import Modal from '@/shared/components/modal';
import LoadingIndicator from '@/assets/icons/loading-indicator';
import LogoutIcon from '@/assets/icons/logout';
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
        onClose={() => setIsOpen(false)}
        icon={
          <div className="bg-error-bg rounded-full p-3">
            <LogoutIcon className="text-error size-8" />
          </div>
        }
      >
        <form
          action={formAction}
          className="flex items-center gap-2 max-md:flex-col"
        >
          <button
            disabled={pending}
            className="button bg-error focus:outline-error"
            style={{ backgroundImage: 'none' }}
          >
            {pending ? <LoadingIndicator className="w-7" /> : t('logout')}
          </button>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            disabled={pending}
            className="button border border-gray-300 bg-none font-normal text-current dark:border-gray-600"
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
