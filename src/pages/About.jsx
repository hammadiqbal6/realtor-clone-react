import React from 'react';
import { Link } from 'react-router-dom';

const siteName = process.env.REACT_APP_SITE_NAME || 'Harbor Homes';

export default function About() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(15,118,110,0.14),transparent_50%),radial-gradient(ellipse_at_bottom_right,rgba(36,54,66,0.14),transparent_45%)]" />
      <div className="relative mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">About</p>
        <h1 className="mt-3 font-display text-4xl text-ink sm:text-5xl">{siteName}</h1>
        <p className="mt-6 text-lg leading-relaxed text-ink/70">
          {siteName} is a realtor-style property listing demo built with React, React Router, and
          Tailwind CSS. It showcases browsing, authentication, and full listing CRUD — all persisted
          locally in your browser so the portfolio runs without a backend.
        </p>
        <p className="mt-4 text-base leading-relaxed text-ink/65">
          Explore offers, filter by rent or sale, create an account, and publish your own homes. The
          interface is tuned for both mobile and desktop, with empty, loading, and error states
          throughout.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link to="/register" className="btn-primary">
            Create an account
          </Link>
          <Link to="/offers" className="btn-secondary">
            View offers
          </Link>
        </div>
      </div>
    </section>
  );
}
