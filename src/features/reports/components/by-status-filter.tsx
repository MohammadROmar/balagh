'use client';

import { useTranslations } from 'next-intl';

import { useFilter } from '../hooks/use-filter';
import Input from '@/shared/components/input';
import GovermentalEentitySelector from '@/features/employees/components/govermental-entity-selector';
import FilterActions from './filter-actions';
import type { GovermentalEntities } from '@/features/employees/models/govermental-entities';

type Props = { govermentalEntities: GovermentalEntities | null };

function ByStatusFilters({ govermentalEntities }: Props) {
  const t = useTranslations('reports');

  const { handleSubmit } = useFilter('');

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
      <FilterActions report="" />
    </form>
  );
}

export default ByStatusFilters;
