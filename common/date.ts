export function formatDateTimeISO(iso: string, locale?: string) {
  const d = new Date(iso);
  // Fallback to device locale
  return new Intl.DateTimeFormat(locale ?? undefined, {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d);
}
