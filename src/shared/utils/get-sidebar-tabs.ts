import AddUserIcon from '@/assets/icons/add-user';
import ComplaintIcon from '@/assets/icons/complaint';
import OverviewIcon from '@/assets/icons/overview';
import type { TFunction } from '../models/tfunction';

export function getSidebarTabs(
  role: 'Administrator' | 'Employee',
  t: TFunction<'sidebar'>,
) {
  if (role === 'Administrator') {
    return [
      {
        label: t('admin.overview'),
        href: '/admin/reports',
        icon: OverviewIcon,
      },
      {
        label: t('admin.registerEmployee'),
        href: '/admin/register-employee',
        icon: AddUserIcon,
      },
      {
        label: t('admin.complaints'),
        href: '/admin/complaints',
        icon: ComplaintIcon,
      },
    ];
  }

  return [
    {
      label: t('employee.complaints'),
      href: '/dashboard/complaints',
      icon: ComplaintIcon,
    },
  ];
}
