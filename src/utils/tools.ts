export function withUnit(size: number): string {
  const kb = 1024;
  const m = 1024 * 1024;
  const g = 1024 * 1024 * 1024;
  if (size > g) {
    return Number(size / g).toFixed(2) + 'G';
  }
  if (size > m) {
    return Number(size / m).toFixed(2) + 'M';
  }
  if (size > kb) {
    return Number(size / kb).toFixed(2) + 'KB';
  }
  return size + 'B';
}
