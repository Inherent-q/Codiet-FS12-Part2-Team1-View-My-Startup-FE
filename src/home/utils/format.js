export function formatAmount(value) {
  const num = Number(value);
  if (isNaN(num)) return "-";
  if (num >= 100000000) {
    return `${Math.floor(num / 100000000).toLocaleString()}억 원`;
  }
  return `${num.toLocaleString()}원`;
}
