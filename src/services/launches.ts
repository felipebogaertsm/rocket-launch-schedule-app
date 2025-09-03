import type { LL2Launch, LL2Paginated } from '@/types/launches';
import { getJSON } from './http';

const BASE = 'https://ll.thespacedevs.com/2.0.0';

export async function fetchUpcomingLaunches(params?: {
  limit?: number;
  search?: string;
  nextUrl?: string | null;
}) {
  if (params?.nextUrl) {
    return getJSON<LL2Paginated<LL2Launch>>(params.nextUrl);
  }

  const limit = params?.limit ?? 20;
  const search = params?.search
    ? `&search=${encodeURIComponent(params.search)}`
    : '';
  const url = `${BASE}/launch/upcoming/?limit=${limit}&ordering=net${search}`;
  return getJSON<LL2Paginated<LL2Launch>>(url);
}
