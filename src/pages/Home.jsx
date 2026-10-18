import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import ListingItem from '../components/ListingItem';
import Spinner from '../components/Spinner';
import ErrorState from '../components/ErrorState';
import EmptyState from '../components/EmptyState';
import { useListings } from '../context/ListingsContext';

const siteName = process.env.REACT_APP_SITE_NAME || 'Harbor Homes';

export default function Home() {
  const { listings, loading, error, refresh } = useListings();

  const { offers, rent, sale } = useMemo(() => {
    const sorted = [...listings].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    return {
      offers: sorted.filter((l) => l.offer).slice(0, 3),
      rent: sorted.filter((l) => l.type === 'rent').slice(0, 3),
      sale: sorted.filter((l) => l.type === 'sale').slice(0, 3),
    };
  }, [listings]);

  if (loading) return <Spinner label="Loading homes…" />;
  if (error) return <ErrorState message={error} onRetry={refresh} />;

  return (
    <div>
      <section className="relative isolate min-h-[88vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80"
          alt="Modern home exterior at dusk"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/55 to-ink/25" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(196,92,38,0.28),transparent_55%)]" />

        <div className="relative mx-auto flex min-h-[88vh] max-w-6xl flex-col justify-end px-4 pb-16 pt-28 sm:px-6 sm:pb-24">
          <p className="animate-fade-up font-display text-4xl text-canvas sm:text-6xl md:text-7xl">
            {siteName}
          </p>
          <h1 className="animate-fade-up mt-4 max-w-xl text-xl font-medium text-canvas/95 delay-100 sm:text-2xl">
            Find a place that feels like arriving home.
          </h1>
          <p className="animate-fade-up mt-4 max-w-lg text-sm leading-relaxed text-canvas/75 delay-200 sm:text-base">
            Browse curated rentals and for-sale homes, save your favorites by listing your own, and
            explore special offers in one calm, modern marketplace.
          </p>
          <div className="animate-fade-up mt-8 flex flex-wrap gap-3 delay-300">
            <Link to="/category/rent" className="btn-primary">
              Explore rentals
            </Link>
            <Link
              to="/category/sale"
              className="inline-flex items-center justify-center rounded-full border border-canvas/40 bg-canvas/10 px-5 py-2.5 text-sm font-semibold text-canvas backdrop-blur transition hover:bg-canvas/20"
            >
              Browse for sale
            </Link>
          </div>
        </div>
      </section>

      <ListingSection
        title="Recent offers"
        subtitle="Homes with a price drop worth a second look."
        listings={offers}
        viewAllTo="/offers"
        emptyTitle="No offers yet"
        emptyMessage="Check back soon for discounted listings."
      />

      <ListingSection
        title="Places for rent"
        subtitle="Move-in ready spaces across coastal towns and city cores."
        listings={rent}
        viewAllTo="/category/rent"
        emptyTitle="No rentals listed"
        emptyMessage="Be the first to list a rental."
        actionLabel="Create listing"
        actionTo="/create-listing"
        tone="fog"
      />

      <ListingSection
        title="Places for sale"
        subtitle="From loft living to hillside retreats."
        listings={sale}
        viewAllTo="/category/sale"
        emptyTitle="No homes for sale"
        emptyMessage="List a property and it will appear here."
        actionLabel="Create listing"
        actionTo="/create-listing"
      />
    </div>
  );
}

function ListingSection({
  title,
  subtitle,
  listings,
  viewAllTo,
  emptyTitle,
  emptyMessage,
  actionLabel,
  actionTo,
  tone,
}) {
  return (
    <section className={`px-4 py-16 sm:px-6 ${tone === 'fog' ? 'bg-fog/70' : ''}`}>
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">{title}</h2>
            <p className="mt-2 max-w-xl text-sm text-ink/60 sm:text-base">{subtitle}</p>
          </div>
          <Link to={viewAllTo} className="text-sm font-semibold text-accent hover:underline">
            View all
          </Link>
        </div>

        {listings.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {listings.map((listing) => (
              <ListingItem key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <EmptyState
            title={emptyTitle}
            message={emptyMessage}
            actionLabel={actionLabel}
            actionTo={actionTo}
          />
        )}
      </div>
    </section>
  );
}
