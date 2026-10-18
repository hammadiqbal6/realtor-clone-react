import React, { useMemo } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import ListingForm from '../components/ListingForm';
import Spinner from '../components/Spinner';
import ErrorState from '../components/ErrorState';
import { useAuth } from '../context/AuthContext';
import { useListings } from '../context/ListingsContext';

export default function EditListing() {
  const { listingId } = useParams();
  const { currentUser } = useAuth();
  const { getListingById, updateListing, loading, error, refresh } = useListings();
  const navigate = useNavigate();

  const listing = useMemo(() => getListingById(listingId), [getListingById, listingId]);

  if (loading) return <Spinner />;
  if (error) return <ErrorState message={error} onRetry={refresh} />;
  if (!listing) {
    return <ErrorState message="Listing not found." onRetry={() => navigate('/profile')} />;
  }
  if (listing.userRef !== currentUser?.id) {
    return <Navigate to={`/category/${listing.type}/${listing.id}`} replace />;
  }

  const handleSubmit = async (payload) => {
    const updated = await updateListing(listing.id, payload);
    toast.success('Listing updated');
    navigate(`/category/${updated.type}/${updated.id}`);
  };

  return (
    <section className="px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-4xl text-ink sm:text-5xl">Edit listing</h1>
        <p className="mt-3 text-ink/60">Update details for “{listing.name}”.</p>
        <div className="mt-8 rounded-3xl bg-white p-6 shadow-[0_18px_40px_-28px_rgba(12,27,42,0.45)] ring-1 ring-ink/5 sm:p-8">
          <ListingForm
            initialListing={listing}
            onSubmit={handleSubmit}
            submitLabel="Save changes"
          />
        </div>
      </div>
    </section>
  );
}
