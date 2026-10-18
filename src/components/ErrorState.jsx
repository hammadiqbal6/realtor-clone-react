import React from 'react';

export default function ErrorState({ message, onRetry }) {
  return (
    <div className="mx-auto max-w-lg rounded-2xl border border-rose-200 bg-rose-50 px-8 py-10 text-center">
      <h3 className="font-display text-2xl text-rose-900">Something went wrong</h3>
      <p className="mt-3 text-sm text-rose-800/80">{message || 'Please try again.'}</p>
      {onRetry ? (
        <button type="button" onClick={onRetry} className="btn-secondary mt-6">
          Try again
        </button>
      ) : null}
    </div>
  );
}
