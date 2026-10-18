export function formatPrice(value) {
  if (value === null || value === undefined || value === '') return '—';
  const number = Number(value);
  if (Number.isNaN(number)) return '—';
  return number.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });
}

export function formatAddress(listing) {
  if (!listing) return '';
  const parts = [listing.address, listing.city, listing.state, listing.zipCode].filter(Boolean);
  return parts.join(', ');
}

export function truncate(text, length = 120) {
  if (!text) return '';
  if (text.length <= length) return text;
  return `${text.slice(0, length).trim()}…`;
}
