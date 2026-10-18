import React, { useMemo } from 'react';
import ListingItem from '../components/ListingItem';
import Spinner from '../components/Spinner';
import ErrorState from '../components/ErrorState';
import EmptyState from '../components/EmptyState';
import { useListings } from '../context/ListingsContext';

export default function Offers() {
  const { listings, loading, error, refresh } = useListings();

  const offers = useMemo(
    () =>
      listings.filter((l) => l.offer).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
    [listings]
  );

  if (loading) return <Spinner />;
  if (error) return <ErrorState message={error} onRetry={refresh} />;

  return (
    <section className="px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <h1 className="font-display text-4xl text-ink sm:text-5xl">Offers</h1>
        <p className="mt-3 max-w-2xl text-ink/60">
          Properties currently listed below their regular asking price.
        </p>

        <div className="mt-10">
          {offers.length ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {offers.map((listing) => (
                <ListingItem key={listing.id} listing={listing} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No active offers"
              message="When sellers add a discount, those homes will show up here."
              actionLabel="Browse all rentals"
              actionTo="/category/rent"
            />
          )}
        </div>
      </div>
    </section>
  );
}
