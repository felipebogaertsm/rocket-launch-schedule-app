import { getJSON } from '@/common/http';
import type { LL2Launch, LL2Paginated, UpcomingParams } from '@/types/launches';

const SPACE_DEVS_BASE_URL = 'https://ll.thespacedevs.com/2.2.0';

/**
 * Fetch upcoming launches (paginated).
 * - Pass `nextUrl` (from the previous response) to get the next page.
 * - Otherwise it builds the first-page URL using `limit` and optional `search`.
 */
export async function fetchUpcomingLaunches(
  params?: UpcomingParams
): Promise<LL2Paginated<LL2Launch>> {
  if (params?.nextUrl) {
    // nextUrl is absolute from the API; just request it directly
    return getJSON<LL2Paginated<LL2Launch>>(params.nextUrl);
  }

  const limit = params?.limit ?? 20;
  const search = params?.search
    ? `&search=${encodeURIComponent(params.search)}`
    : '';
  const url = `${SPACE_DEVS_BASE_URL}/launch/upcoming/?limit=${limit}&ordering=net${search}`;
  return getJSON<LL2Paginated<LL2Launch>>(url);
}

/**
 * Fetch a single launch by ID.
 */
export async function fetchLaunchById(id: string): Promise<LL2Launch> {
  return getJSON<LL2Launch>(`${SPACE_DEVS_BASE_URL}/launch/${id}/`);
}
