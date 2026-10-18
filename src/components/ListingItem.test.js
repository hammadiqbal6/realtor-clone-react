import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ListingItem from './ListingItem';

const listing = {
  id: 'listing-qa',
  name: 'QA Corner Condo',
  type: 'rent',
  bedrooms: 1,
  bathrooms: 1,
  offer: true,
  regularPrice: 2400,
  discountedPrice: 2200,
  address: '100 Test Ave',
  city: 'Denver',
  state: 'CO',
  zipCode: '80202',
  images: ['https://example.com/photo.jpg'],
};

test('renders listing card with offer price and singular bed label', () => {
  render(
    <MemoryRouter>
      <ListingItem listing={listing} />
    </MemoryRouter>
  );

  expect(screen.getByText('QA Corner Condo')).toBeInTheDocument();
  expect(screen.getByText('$2,200 / mo')).toBeInTheDocument();
  expect(screen.getByText('1 bed')).toBeInTheDocument();
  expect(screen.getByText('1 bath')).toBeInTheDocument();
  expect(screen.getByText('Offer')).toBeInTheDocument();
});
