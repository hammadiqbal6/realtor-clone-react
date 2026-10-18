import React, { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaBath, FaBed, FaChair, FaParking } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';
import { toast } from 'react-toastify';
import ImageSlider from '../components/ImageSlider';
import Spinner from '../components/Spinner';
import ErrorState from '../components/ErrorState';
import { useAuth } from '../context/AuthContext';
import { useListings } from '../context/ListingsContext';
import { formatAddress, formatPrice } from '../utils/formatters';

export default function Listing() {
  const { listingId } = useParams();
  const { currentUser } = useAuth();
  const { getListingById, loading, error, refresh, deleteListing } = useListings();
  const navigate = useNavigate();
  const [contactOpen, setContactOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const listing = useMemo(() => getListingById(listingId), [getListingById, listingId]);

  if (loading) return <Spinner />;
  if (error) return <ErrorState message={error} onRetry={refresh} />;
  if (!listing) {
    return (
      <ErrorState
        message="This listing could not be found. It may have been removed."
        onRetry={() => navigate('/')}
      />
    );
  }

  const isOwner = currentUser?.id === listing.userRef;
  const price = listing.offer ? listing.discountedPrice : listing.regularPrice;
  const priceLabel = listing.type === 'rent' ? `${formatPrice(price)} / month` : formatPrice(price);

  const handleDelete = async () => {
    if (!window.confirm('Delete this listing? This cannot be undone.')) return;
    try {
      setDeleting(true);
      await deleteListing(listing.id);
      toast.success('Listing deleted');
      navigate('/profile');
    } catch (err) {
      toast.error(err.message || 'Could not delete listing');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      <ImageSlider images={listing.images} alt={listing.name} />

      <section className="px-4 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.4fr_0.8fr]">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-ink px-3 py-1 text-xs font-semibold uppercase tracking-wider text-canvas">
                For {listing.type}
              </span>
              {listing.offer ? (
                <span className="rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
                  Special offer
                </span>
              ) : null}
            </div>

            <h1 className="mt-4 font-display text-4xl text-ink sm:text-5xl">{listing.name}</h1>
            <p className="mt-3 flex items-start gap-2 text-ink/60">
              <MdLocationOn className="mt-1 text-accent" />
              {formatAddress(listing)}
            </p>

            <div className="mt-6 flex flex-wrap items-baseline gap-3">
              <p className="text-3xl font-semibold text-ink">{priceLabel}</p>
              {listing.offer ? (
                <p className="text-lg text-ink/40 line-through">
                  {formatPrice(listing.regularPrice)}
                  {listing.type === 'rent' ? ' / mo' : ''}
                </p>
              ) : null}
            </div>

            <div className="mt-8 flex flex-wrap gap-4 text-sm text-ink/70">
              <span className="inline-flex items-center gap-2 rounded-full bg-fog px-3 py-1.5">
                <FaBed /> {listing.bedrooms} beds
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-fog px-3 py-1.5">
                <FaBath /> {listing.bathrooms} baths
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-fog px-3 py-1.5">
                <FaParking /> {listing.parking ? 'Parking' : 'No parking'}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-fog px-3 py-1.5">
                <FaChair /> {listing.furnished ? 'Furnished' : 'Unfurnished'}
              </span>
            </div>

            <div className="mt-10">
              <h2 className="font-display text-2xl text-ink">About this home</h2>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink/70">
                {listing.description}
              </p>
            </div>
          </div>

          <aside className="h-fit rounded-2xl bg-white p-6 shadow-[0_18px_40px_-28px_rgba(12,27,42,0.45)] ring-1 ring-ink/5">
            {isOwner ? (
              <div className="space-y-3">
                <p className="text-sm text-ink/60">You own this listing.</p>
                <Link to={`/edit-listing/${listing.id}`} className="btn-primary block text-center">
                  Edit listing
                </Link>
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={deleting}
                  className="btn-secondary w-full border-rose-200 text-rose-700 hover:bg-rose-50"
                >
                  {deleting ? 'Deleting…' : 'Delete listing'}
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <h3 className="font-display text-2xl text-ink">Interested?</h3>
                <p className="text-sm leading-relaxed text-ink/60">
                  Reach out about availability, showings, or to request more photos.
                </p>
                {!contactOpen ? (
                  <button
                    type="button"
                    className="btn-primary w-full"
                    onClick={() => setContactOpen(true)}
                  >
                    Contact landlord
                  </button>
                ) : (
                  <div className="rounded-xl bg-fog px-4 py-3 text-sm text-ink/75">
                    Demo mode: message the owner at{' '}
                    <span className="font-medium text-ink">demo@harborhomes.dev</span> referencing “
                    {listing.name}”.
                  </div>
                )}
                {!currentUser ? (
                  <p className="text-xs text-ink/50">
                    <Link to="/login" className="font-medium text-accent hover:underline">
                      Sign in
                    </Link>{' '}
                    to manage your own listings.
                  </p>
                ) : null}
              </div>
            )}
          </aside>
        </div>
      </section>
    </div>
  );
}
