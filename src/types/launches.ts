export type LL2Status = { id: number; name: string; abbrev?: string };

export type LL2Provider = { id: number; name: string };
export type LL2Pad = {
  id: number;
  name: string;
  location?: { id: number; name: string; country_code?: string };
};

export type LL2Mission = { id: number; name: string; description?: string };

export type LL2Launch = {
  id: string;
  name: string;
  net: string; // ISO datetime (No Earlier Than)
  image?: string | null;
  status?: LL2Status;
  mission?: LL2Mission | null;
  pad?: LL2Pad | null;
  launch_service_provider?: LL2Provider | null;
  webcast_live?: boolean;
  url?: string;
};

export type LL2Paginated<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};
