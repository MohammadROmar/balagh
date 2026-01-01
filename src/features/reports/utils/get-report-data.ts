import { get } from '@/shared/api/get';

export async function getReportData<T>(
  searchParams: Record<string, string>,
  type: string,
) {
  const urlSearchParams = new URLSearchParams(searchParams);

  const dataResponse = await get<T>(`/api/reports/${type}?${urlSearchParams}`);
  const data = dataResponse.message === 'success' ? dataResponse.data : [];

  return data;
}
