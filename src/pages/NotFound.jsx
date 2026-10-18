import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="px-4 py-24 text-center sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">404</p>
      <h1 className="mt-3 font-display text-4xl text-ink sm:text-5xl">Page not found</h1>
      <p className="mx-auto mt-4 max-w-md text-ink/60">
        That route doesn&apos;t exist. Head back home to keep browsing listings.
      </p>
      <Link to="/" className="btn-primary mt-8 inline-flex">
        Back to home
      </Link>
    </section>
  );
}
