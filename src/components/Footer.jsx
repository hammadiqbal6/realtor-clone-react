import React from 'react';
import { Link } from 'react-router-dom';

const siteName = process.env.REACT_APP_SITE_NAME || 'Harbor Homes';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-ink/10 bg-ink text-canvas">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl">{siteName}</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-canvas/70">
            A polished realtor-style listing experience for discovering homes to rent or buy.
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-canvas/50">
            Explore
          </p>
          <div className="mt-4 flex flex-col gap-2 text-sm text-canvas/80">
            <Link to="/offers" className="hover:text-canvas">
              Special offers
            </Link>
            <Link to="/category/rent" className="hover:text-canvas">
              Places for rent
            </Link>
            <Link to="/category/sale" className="hover:text-canvas">
              Places for sale
            </Link>
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-canvas/50">
            Account
          </p>
          <div className="mt-4 flex flex-col gap-2 text-sm text-canvas/80">
            <Link to="/login" className="hover:text-canvas">
              Sign in
            </Link>
            <Link to="/register" className="hover:text-canvas">
              Create account
            </Link>
            <Link to="/create-listing" className="hover:text-canvas">
              List a property
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-canvas/10 px-4 py-4 text-center text-xs text-canvas/45">
        © {new Date().getFullYear()} {siteName}. Portfolio demo — data stored locally in your
        browser.
      </div>
    </footer>
  );
}
