'use client';

import { useTranslations } from 'next-intl';

import { useFilter } from '../hooks/use-filter';
import Input from '@/shared/components/input';
import GovermentalEentitySelector from '@/features/employees/components/govermental-entity-selector';
import StatusSelect from '@/features/complaints/components/status-selector';
import FilterActions from './filter-actions';
import type { GovermentalEntities } from '@/features/employees/models/govermental-entities';

type Props = { govermentalEntities: GovermentalEntities | null };

function ByTimeFilters({ govermentalEntities }: Props) {
  const t = useTranslations('reports');

  const { handleSubmit } = useFilter('/by-time');

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4 lg:grid-cols-4">
        <div className="flex w-full flex-col gap-2">
          <label htmlFor="status" className="text-sm">
            {t('data.status')}
          </label>
          <StatusSelect />
        </div>
        <GovermentalEentitySelector
          required={false}
          hasDefaultValue={false}
          title={t('filters.govermentalEntityId')}
          govermentalEntities={govermentalEntities}
        />
        <Input
          label={t('filters.location')}
          required={false}
          type="text"
          id="location"
          placeholder={t('locationPlaceholder')}
          className="bg-primary-background!"
        />
      </div>
      <FilterActions report="/by-time" />
    </form>
  );
}

export default ByTimeFilters;
