import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const siteName = process.env.REACT_APP_SITE_NAME || 'Harbor Homes';

const linkClass = ({ isActive }) =>
  [
    'relative px-1 py-1 text-sm font-medium tracking-wide transition-colors',
    isActive ? 'text-accent' : 'text-ink/70 hover:text-ink',
  ].join(' ');

export default function Header() {
  const { currentUser } = useAuth();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={[
        'sticky top-0 z-40 border-b transition-all duration-300',
        scrolled
          ? 'border-ink/10 bg-canvas/95 shadow-sm backdrop-blur-md'
          : 'border-transparent bg-canvas/80 backdrop-blur-sm',
      ].join(' ')}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link to="/" className="group flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-sm font-semibold text-canvas transition-transform duration-300 group-hover:scale-105">
            HH
          </span>
          <span className="font-display text-xl tracking-tight text-ink sm:text-2xl">
            {siteName}
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <NavLink to="/" end className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/offers" className={linkClass}>
            Offers
          </NavLink>
          <NavLink to="/category/rent" className={linkClass}>
            Rent
          </NavLink>
          <NavLink to="/category/sale" className={linkClass}>
            Buy
          </NavLink>
          <NavLink to="/about" className={linkClass}>
            About
          </NavLink>
          {currentUser ? (
            <NavLink to="/profile" className={linkClass}>
              Profile
            </NavLink>
          ) : (
            <NavLink to="/login" className={linkClass}>
              Sign in
            </NavLink>
          )}
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <div className="flex w-4 flex-col gap-1">
            <span
              className={`h-0.5 bg-ink transition ${open ? 'translate-y-1.5 rotate-45' : ''}`}
            />
            <span className={`h-0.5 bg-ink transition ${open ? 'opacity-0' : ''}`} />
            <span
              className={`h-0.5 bg-ink transition ${open ? '-translate-y-1.5 -rotate-45' : ''}`}
            />
          </div>
        </button>
      </div>

      {open ? (
        <nav className="animate-fade-up border-t border-ink/10 bg-canvas px-4 py-4 md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-3">
            <NavLink to="/" end className={linkClass}>
              Home
            </NavLink>
            <NavLink to="/offers" className={linkClass}>
              Offers
            </NavLink>
            <NavLink to="/category/rent" className={linkClass}>
              Rent
            </NavLink>
            <NavLink to="/category/sale" className={linkClass}>
              Buy
            </NavLink>
            <NavLink to="/about" className={linkClass}>
              About
            </NavLink>
            {currentUser ? (
              <NavLink to="/profile" className={linkClass}>
                Profile
              </NavLink>
            ) : (
              <NavLink to="/login" className={linkClass}>
                Sign in
              </NavLink>
            )}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
