export function asList<T>(data: T[] | Record<string, T> | null | undefined): T[] {
  if (!data) return [];
  return Array.isArray(data) ? data : Object.values(data);
}
