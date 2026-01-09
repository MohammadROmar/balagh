'use client';

import { useActionState, useState } from 'react';
import { useTranslations } from 'next-intl';
import clsx from 'clsx';

import { useDialog } from '@/shared/hooks/use-dialog';
import Modal from '@/features/dashboard/components/modal';
import LogoutIcon from '@/assets/icons/logout';
import Button from '@/shared/components/button';
import { logoutAction } from '../api/logout';

function Logout({ textStyles }: { textStyles?: string }) {
  const [, formAction, pending] = useActionState(logoutAction, null);

  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations('sidebar');

  const dialogRef = useDialog(isOpen);

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
          <Button
            pending={pending}
            className="bg-error flex items-center justify-center focus:outline-none!"
            style={{ backgroundImage: 'none' }}
          >
            {t('logout')}
          </Button>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            disabled={pending}
            className="button border border-gray-300 bg-none font-normal text-current focus:outline-none dark:border-gray-600"
          >
            {t('cancel')}
          </button>
        </form>
      </Modal>

      <button
        onClick={() => setIsOpen(true)}
        className={clsx(
          'text-error button flex cursor-pointer gap-2 bg-none p-4 font-normal focus:outline-none!',
          textStyles && 'p-0!',
        )}
      >
        <span>
          <LogoutIcon className="size-6 shrink-0" />
        </span>
        <span className={textStyles}>{t('logout')}</span>
      </button>
    </>
  );
}

export default Logout;
