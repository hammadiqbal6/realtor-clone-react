import React from 'react';
import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';
import { FaBath, FaBed } from 'react-icons/fa';
import { formatAddress, formatPrice } from '../utils/formatters';

export default function ListingItem({ listing }) {
  if (!listing) return null;

  const price = listing.offer ? listing.discountedPrice : listing.regularPrice;
  const priceLabel = listing.type === 'rent' ? `${formatPrice(price)} / mo` : formatPrice(price);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_18px_40px_-28px_rgba(12,27,42,0.45)] ring-1 ring-ink/5 transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_50px_-24px_rgba(12,27,42,0.5)]">
      <Link
        to={`/category/${listing.type}/${listing.id}`}
        className="relative block overflow-hidden"
      >
        <img
          src={listing.images?.[0]}
          alt={listing.name}
          className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {listing.offer ? (
          <span className="absolute left-3 top-3 bg-accent px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-white">
            Offer
          </span>
        ) : null}
        <span className="absolute bottom-3 right-3 bg-ink/85 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-canvas">
          For {listing.type}
        </span>
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <Link to={`/category/${listing.type}/${listing.id}`}>
            <h3 className="font-display text-xl text-ink transition group-hover:text-accent">
              {listing.name}
            </h3>
          </Link>
          <p className="mt-1 flex items-start gap-1 text-sm text-ink/55">
            <MdLocationOn className="mt-0.5 shrink-0 text-accent" />
            <span>{formatAddress(listing)}</span>
          </p>
        </div>

        <p className="text-lg font-semibold text-ink">{priceLabel}</p>

        <div className="mt-auto flex items-center gap-4 text-sm text-ink/65">
          <span className="inline-flex items-center gap-1.5">
            <FaBed className="text-ink/40" />
            {listing.bedrooms} {listing.bedrooms === 1 ? 'bed' : 'beds'}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <FaBath className="text-ink/40" />
            {listing.bathrooms} {listing.bathrooms === 1 ? 'bath' : 'baths'}
          </span>
        </div>
      </div>
    </article>
  );
}
