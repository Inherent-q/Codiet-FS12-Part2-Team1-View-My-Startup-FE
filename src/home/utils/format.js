export function formatAmount(value) {
  const num = Number(value);
  if (isNaN(num)) return "-";
  if (num < 0) return "-";
  if (num >= 100000000) {
    return `${Math.floor(num / 100000000).toLocaleString()}억 원`;
  }
  if (num >= 10000) return `${Math.floor(num / 10000).toLocaleString()}만 원`;
  return `${num.toLocaleString()}원`;
}
