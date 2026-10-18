import React, { useMemo } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import ListingItem from '../components/ListingItem';
import Spinner from '../components/Spinner';
import ErrorState from '../components/ErrorState';
import EmptyState from '../components/EmptyState';
import { useListings } from '../context/ListingsContext';

export default function Category() {
  const { categoryName } = useParams();
  const { listings, loading, error, refresh } = useListings();

  const type = categoryName === 'rent' || categoryName === 'sale' ? categoryName : null;

  const filtered = useMemo(() => {
    if (!type) return [];
    return listings
      .filter((l) => l.type === type)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [listings, type]);

  if (!type) return <Navigate to="/" replace />;
  if (loading) return <Spinner />;
  if (error) return <ErrorState message={error} onRetry={refresh} />;

  const title = type === 'rent' ? 'Places for rent' : 'Places for sale';

  return (
    <section className="px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <h1 className="font-display text-4xl text-ink sm:text-5xl">{title}</h1>
        <p className="mt-3 max-w-2xl text-ink/60">
          {type === 'rent'
            ? 'Browse available rentals sorted by newest listing.'
            : 'Browse homes for sale sorted by newest listing.'}
        </p>

        <div className="mt-10">
          {filtered.length ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((listing) => (
                <ListingItem key={listing.id} listing={listing} />
              ))}
            </div>
          ) : (
            <EmptyState
              title={`No ${type === 'rent' ? 'rentals' : 'homes for sale'} yet`}
              message="Create a listing to populate this category."
              actionLabel="Create listing"
              actionTo="/create-listing"
            />
          )}
        </div>
      </div>
    </section>
  );
}
