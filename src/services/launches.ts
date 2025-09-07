// src/services/launches.ts
import type { LL2Launch, LL2Paginated } from "@/types/launches";
import { getJSON } from "../common/http";

// NOTE: LL2's current stable is 2.2.0; 2.0.0 also works but has fewer fields in some endpoints.
// If you want the latest fields, use 2.2.0. Keep it consistent across your app.
const BASE = "https://ll.thespacedevs.com/2.2.0";

type UpcomingParams = {
  limit?: number;
  search?: string;
  nextUrl?: string | null;
};

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
  const search = params?.search ? `&search=${encodeURIComponent(params.search)}` : "";
  const url = `${BASE}/launch/upcoming/?limit=${limit}&ordering=net${search}`;
  return getJSON<LL2Paginated<LL2Launch>>(url);
}

/**
 * Fetch a single launch by ID.
 */
export async function fetchLaunchById(id: string): Promise<LL2Launch> {
  return getJSON<LL2Launch>(`${BASE}/launch/${id}/`);
}
