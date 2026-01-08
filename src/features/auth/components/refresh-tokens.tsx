'use client';

import { useState, useEffect, useActionState } from 'react';
import { useTranslations } from 'next-intl';

import { useRouter } from '@/i18n/navigation';
import { useDialog } from '@/shared/hooks/use-dialog';
import Modal from '@/features/dashboard/components/modal';
import ShieldIcon from '@/assets/icons/shield';
import Button from '@/shared/components/button';
import { logoutAction } from '../api/logout';

export default function RefreshTokens() {
  const [hasError, setHasError] = useState(false);
  const router = useRouter();
  const dialogRef = useDialog(hasError);

  const t = useTranslations('session.end');

  const [, formAction, pending] = useActionState(logoutAction, null);

  useEffect(() => {
    async function refresh() {
      try {
        const res = await fetch('/api/users/token/refresh', {
          method: 'POST',
        });

        if (!res.ok) setHasError(true);
      } catch (e) {
        console.error(e);

        setHasError(true);
      }
    }

    refresh();

    const refreshInterval = setInterval(refresh, 25 * 60 * 1000);

    return () => {
      clearInterval(refreshInterval);
    };
  }, []);

  async function handleClose() {
    setHasError(false);

    fetch('/api/users/token/delete', {
      method: 'DELETE',
    })
      .then(() => router.replace('/'))
      .catch((e) => console.error(e));
  }

  return (
    <Modal
      ref={dialogRef}
      title={t('title')}
      description={t('subtitle')}
      onClose={handleClose}
      icon={
        <div className="bg-teal/30 rounded-full p-3">
          <ShieldIcon className="text-teal size-8" />
        </div>
      }
    >
      <form action={formAction}>
        <Button pending={pending}>{t('action')}</Button>
      </form>
    </Modal>
  );
}
