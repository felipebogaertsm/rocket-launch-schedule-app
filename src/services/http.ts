const DEFAULT_TIMEOUT_MS = 15_000;

export class HttpError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
  }
}

export async function getJSON<T>(
  url: string,
  init?: RequestInit,
  timeoutMs = DEFAULT_TIMEOUT_MS
): Promise<T> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, { ...init, signal: controller.signal });
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new HttpError(
        `GET ${url} failed: ${res.status} ${res.statusText} ${text}`,
        res.status
      );
    }
    return (await res.json()) as T;
  } finally {
    clearTimeout(id);
  }
}
