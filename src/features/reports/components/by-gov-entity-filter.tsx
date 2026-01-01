'use client';

import { useTranslations } from 'next-intl';

import { useFilter } from '../hooks/use-filter';
import Input from '@/shared/components/input';
import StatusSelect from '@/features/complaints/components/status-selector';
import FilterActions from './filter-actions';

function ByGovEntityFilters() {
  const t = useTranslations('reports');

  const { handleSubmit } = useFilter('/by-gov-entity');

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4 lg:grid-cols-4">
        <Input
          label={t('filters.from')}
          type="date"
          required={false}
          id="from"
          className="bg-primary-background!"
        />
        <Input
          label={t('filters.to')}
          type="date"
          id="to"
          required={false}
          className="bg-primary-background!"
        />
        <div className="flex w-full flex-col gap-2">
          <label htmlFor="status" className="text-sm">
            {t('data.status')}
          </label>
          <StatusSelect />
        </div>
        <Input
          label={t('filters.location')}
          required={false}
          type="text"
          id="location"
          placeholder={t('locationPlaceholder')}
          className="bg-primary-background!"
        />
      </div>
      <FilterActions report="/by-gov-entity" />
    </form>
  );
}

export default ByGovEntityFilters;
