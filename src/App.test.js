import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Harbor Homes brand on the home page', async () => {
  render(<App />);
  const brands = await screen.findAllByText(/Harbor Homes/i);
  expect(brands.length).toBeGreaterThan(0);
});
