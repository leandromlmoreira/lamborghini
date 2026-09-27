export function wideSlots(count: number, columns: number): Set<number> {
  if (columns < 2 || count < 2) return new Set();
  const missing = (columns - (count % columns)) % columns;
  if (missing === 0) return new Set();
  if (missing === 1) return new Set([0]);
  return columns === 3 ? new Set([0, count - 1]) : new Set();
}
