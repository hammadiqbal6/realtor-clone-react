import React from 'react';
import { Link } from 'react-router-dom';

export default function EmptyState({ title, message, actionLabel, actionTo }) {
  return (
    <div className="mx-auto max-w-lg rounded-2xl border border-dashed border-ink/15 bg-white/70 px-8 py-12 text-center">
      <h3 className="font-display text-2xl text-ink">{title}</h3>
      {message ? <p className="mt-3 text-sm leading-relaxed text-ink/65">{message}</p> : null}
      {actionLabel && actionTo ? (
        <Link to={actionTo} className="btn-primary mt-6 inline-flex">
          {actionLabel}
        </Link>
      ) : null}
    </div>
  );
}
