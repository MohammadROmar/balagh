import { getLocale } from 'next-intl/server';

import { redirect } from '@/i18n/navigation';

async function AdminPage() {
  const locale = await getLocale();

  redirect({ href: '/admin/reports', locale });

  return null;
}

export default AdminPage;
