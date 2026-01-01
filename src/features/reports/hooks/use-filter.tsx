import { FormEvent } from 'react';

import { useRouter } from '@/i18n/navigation';
import { handleFilters } from '../utils/handle-filters';

export function useFilter(to: string) {
  const router = useRouter();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const searchParams = handleFilters(e.currentTarget);
    router.push(`/admin/reports${to}?${searchParams}`);
  }

  return { handleSubmit };
}
