import React, { useState } from 'react';

const emptyForm = {
  name: '',
  type: 'rent',
  bedrooms: 1,
  bathrooms: 1,
  parking: false,
  furnished: false,
  offer: false,
  regularPrice: '',
  discountedPrice: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  latitude: '',
  longitude: '',
  description: '',
  imagesText: '',
};

function listingToForm(listing) {
  if (!listing) return emptyForm;
  return {
    name: listing.name || '',
    type: listing.type || 'rent',
    bedrooms: listing.bedrooms ?? 1,
    bathrooms: listing.bathrooms ?? 1,
    parking: Boolean(listing.parking),
    furnished: Boolean(listing.furnished),
    offer: Boolean(listing.offer),
    regularPrice: listing.regularPrice ?? '',
    discountedPrice: listing.discountedPrice ?? '',
    address: listing.address || '',
    city: listing.city || '',
    state: listing.state || '',
    zipCode: listing.zipCode || '',
    latitude: listing.latitude ?? '',
    longitude: listing.longitude ?? '',
    description: listing.description || '',
    imagesText: (listing.images || []).join('\n'),
  };
}

export default function ListingForm({ initialListing, onSubmit, submitLabel = 'Save listing' }) {
  const [form, setForm] = useState(() => listingToForm(initialListing));
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const update = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const images = form.imagesText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    if (!form.name.trim()) return setError('Listing name is required.');
    if (!form.address.trim() || !form.city.trim() || !form.state.trim()) {
      return setError('Address, city, and state are required.');
    }
    if (!form.description.trim()) return setError('Description is required.');
    if (!form.regularPrice || Number(form.regularPrice) <= 0) {
      return setError('Enter a valid regular price.');
    }
    if (form.offer) {
      if (!form.discountedPrice || Number(form.discountedPrice) <= 0) {
        return setError('Enter a valid discounted price.');
      }
      if (Number(form.discountedPrice) >= Number(form.regularPrice)) {
        return setError('Discounted price must be lower than the regular price.');
      }
    }
    if (!images.length) {
      return setError('Add at least one image URL (one per line).');
    }

    const payload = {
      name: form.name.trim(),
      type: form.type,
      bedrooms: Number(form.bedrooms),
      bathrooms: Number(form.bathrooms),
      parking: form.parking,
      furnished: form.furnished,
      offer: form.offer,
      regularPrice: Number(form.regularPrice),
      discountedPrice: form.offer ? Number(form.discountedPrice) : null,
      address: form.address.trim(),
      city: form.city.trim(),
      state: form.state.trim(),
      zipCode: form.zipCode.trim(),
      latitude: form.latitude === '' ? null : Number(form.latitude),
      longitude: form.longitude === '' ? null : Number(form.longitude),
      description: form.description.trim(),
      images,
    };

    try {
      setSubmitting(true);
      await onSubmit(payload);
    } catch (err) {
      setError(err.message || 'Unable to save listing.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error ? (
        <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
          {error}
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="field sm:col-span-2">
          <span>Listing name</span>
          <input
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            placeholder="Seaside Craftsman Retreat"
          />
        </label>

        <fieldset className="field">
          <span>Sell / Rent</span>
          <div className="mt-2 flex gap-2">
            {['sale', 'rent'].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => update('type', type)}
                className={`flex-1 rounded-xl border px-3 py-2.5 text-sm font-medium capitalize transition ${
                  form.type === type
                    ? 'border-ink bg-ink text-canvas'
                    : 'border-ink/15 bg-white text-ink hover:border-ink/30'
                }`}
              >
                {type === 'sale' ? 'Sell' : 'Rent'}
              </button>
            ))}
          </div>
        </fieldset>

        <label className="field">
          <span>Bedrooms</span>
          <input
            type="number"
            min="0"
            value={form.bedrooms}
            onChange={(e) => update('bedrooms', e.target.value)}
          />
        </label>

        <label className="field">
          <span>Bathrooms</span>
          <input
            type="number"
            min="0"
            step="0.5"
            value={form.bathrooms}
            onChange={(e) => update('bathrooms', e.target.value)}
          />
        </label>

        {[
          ['parking', 'Parking spot'],
          ['furnished', 'Furnished'],
          ['offer', 'Offer'],
        ].map(([key, label]) => (
          <fieldset key={key} className="field">
            <span>{label}</span>
            <div className="mt-2 flex gap-2">
              {[true, false].map((val) => (
                <button
                  key={String(val)}
                  type="button"
                  onClick={() => update(key, val)}
                  className={`flex-1 rounded-xl border px-3 py-2.5 text-sm font-medium transition ${
                    form[key] === val
                      ? 'border-ink bg-ink text-canvas'
                      : 'border-ink/15 bg-white text-ink hover:border-ink/30'
                  }`}
                >
                  {val ? 'Yes' : 'No'}
                </button>
              ))}
            </div>
          </fieldset>
        ))}

        <label className="field">
          <span>Regular price {form.type === 'rent' ? '($ / month)' : '($)'}</span>
          <input
            type="number"
            min="0"
            value={form.regularPrice}
            onChange={(e) => update('regularPrice', e.target.value)}
          />
        </label>

        {form.offer ? (
          <label className="field">
            <span>Discounted price {form.type === 'rent' ? '($ / month)' : '($)'}</span>
            <input
              type="number"
              min="0"
              value={form.discountedPrice}
              onChange={(e) => update('discountedPrice', e.target.value)}
            />
          </label>
        ) : null}

        <label className="field sm:col-span-2">
          <span>Street address</span>
          <input
            value={form.address}
            onChange={(e) => update('address', e.target.value)}
            placeholder="142 Harbor View Rd"
          />
        </label>

        <label className="field">
          <span>City</span>
          <input value={form.city} onChange={(e) => update('city', e.target.value)} />
        </label>
        <label className="field">
          <span>State</span>
          <input value={form.state} onChange={(e) => update('state', e.target.value)} />
        </label>
        <label className="field">
          <span>ZIP</span>
          <input value={form.zipCode} onChange={(e) => update('zipCode', e.target.value)} />
        </label>
        <label className="field">
          <span>Latitude (optional)</span>
          <input
            type="number"
            step="any"
            value={form.latitude}
            onChange={(e) => update('latitude', e.target.value)}
          />
        </label>
        <label className="field">
          <span>Longitude (optional)</span>
          <input
            type="number"
            step="any"
            value={form.longitude}
            onChange={(e) => update('longitude', e.target.value)}
          />
        </label>

        <label className="field sm:col-span-2">
          <span>Description</span>
          <textarea
            rows={4}
            value={form.description}
            onChange={(e) => update('description', e.target.value)}
            placeholder="Describe the property, neighborhood, and standout features."
          />
        </label>

        <label className="field sm:col-span-2">
          <span>Image URLs (one per line)</span>
          <textarea
            rows={4}
            value={form.imagesText}
            onChange={(e) => update('imagesText', e.target.value)}
            placeholder="https://images.unsplash.com/..."
          />
        </label>
      </div>

      <button type="submit" className="btn-primary w-full sm:w-auto" disabled={submitting}>
        {submitting ? 'Saving…' : submitLabel}
      </button>
    </form>
  );
}
