import { formatAddress, formatPrice, truncate } from './formatters';

describe('formatters', () => {
  test('formatPrice formats USD without cents', () => {
    expect(formatPrice(1695)).toBe('$1,695');
    expect(formatPrice(1125000)).toBe('$1,125,000');
  });

  test('formatPrice handles empty values', () => {
    expect(formatPrice(null)).toBe('—');
    expect(formatPrice('')).toBe('—');
  });

  test('formatAddress joins location parts', () => {
    expect(
      formatAddress({
        address: '401 Riverwalk Ave',
        city: 'Chicago',
        state: 'IL',
        zipCode: '60601',
      })
    ).toBe('401 Riverwalk Ave, Chicago, IL, 60601');
  });

  test('truncate shortens long text', () => {
    expect(truncate('short')).toBe('short');
    expect(truncate('abcdefghijklmnopqrstuvwxyz', 10)).toBe('abcdefghij…');
  });
});
