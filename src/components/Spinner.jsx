import React from 'react';

export default function Spinner({ label = 'Loading…' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16" role="status">
      <div className="h-10 w-10 animate-spin rounded-full border-[3px] border-fog border-t-accent" />
      <p className="text-sm text-ink/60">{label}</p>
    </div>
  );
}
