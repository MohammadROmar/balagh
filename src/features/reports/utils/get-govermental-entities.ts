import { get } from '@/shared/api/get';
import type { GovermentalEntities } from '@/features/employees/models/govermental-entities';

export async function getGovermentalEntities() {
  const govermentalEntitiesResponse = await get<GovermentalEntities>(
    '/api/govermentalEntities',
  );

  const govermentalEntities =
    govermentalEntitiesResponse.message === 'success'
      ? govermentalEntitiesResponse.data
      : [];

  return govermentalEntities;
}
