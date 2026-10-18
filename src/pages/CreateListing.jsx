import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ListingForm from '../components/ListingForm';
import { useListings } from '../context/ListingsContext';

export default function CreateListing() {
  const { createListing } = useListings();
  const navigate = useNavigate();

  const handleSubmit = async (payload) => {
    const listing = await createListing(payload);
    toast.success('Listing created');
    navigate(`/category/${listing.type}/${listing.id}`);
  };

  return (
    <section className="px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-4xl text-ink sm:text-5xl">Create a listing</h1>
        <p className="mt-3 text-ink/60">
          Add photos, pricing, and details. Listings are saved in this browser.
        </p>
        <div className="mt-8 rounded-3xl bg-white p-6 shadow-[0_18px_40px_-28px_rgba(12,27,42,0.45)] ring-1 ring-ink/5 sm:p-8">
          <ListingForm onSubmit={handleSubmit} submitLabel="Create listing" />
        </div>
      </div>
    </section>
  );
}
