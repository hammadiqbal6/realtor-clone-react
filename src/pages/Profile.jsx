import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ListingItem from '../components/ListingItem';
import EmptyState from '../components/EmptyState';
import Spinner from '../components/Spinner';
import { useAuth } from '../context/AuthContext';
import { useListings } from '../context/ListingsContext';

export default function Profile() {
  const { currentUser, updateProfile, logout } = useAuth();
  const { listings, loading, deleteListing } = useListings();
  const navigate = useNavigate();
  const [name, setName] = useState(currentUser?.name || '');
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const myListings = useMemo(
    () => listings.filter((l) => l.userRef === currentUser?.id),
    [listings, currentUser]
  );

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      await updateProfile({ name });
      toast.success('Profile updated');
      setEditing(false);
    } catch (err) {
      toast.error(err.message || 'Could not update profile');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    toast.info('Signed out');
    navigate('/');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this listing?')) return;
    try {
      await deleteListing(id);
      toast.success('Listing deleted');
    } catch (err) {
      toast.error(err.message || 'Could not delete listing');
    }
  };

  return (
    <section className="px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-4xl text-ink sm:text-5xl">Your profile</h1>
            <p className="mt-2 text-ink/60">Manage account details and your property listings.</p>
          </div>
          <Link to="/create-listing" className="btn-primary">
            Create listing
          </Link>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[0.9fr_1.4fr]">
          <div className="rounded-3xl bg-white p-6 shadow-[0_18px_40px_-28px_rgba(12,27,42,0.45)] ring-1 ring-ink/5 sm:p-8">
            <h2 className="font-display text-2xl text-ink">Account</h2>
            <form onSubmit={handleSave} className="mt-6 space-y-4">
              <label className="field">
                <span>Name</span>
                <input value={name} disabled={!editing} onChange={(e) => setName(e.target.value)} />
              </label>
              <label className="field">
                <span>Email</span>
                <input value={currentUser?.email || ''} disabled />
              </label>

              <div className="flex flex-wrap gap-3 pt-2">
                {editing ? (
                  <>
                    <button type="submit" className="btn-primary" disabled={saving}>
                      {saving ? 'Saving…' : 'Save'}
                    </button>
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={() => {
                        setEditing(false);
                        setName(currentUser?.name || '');
                      }}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button type="button" className="btn-secondary" onClick={() => setEditing(true)}>
                    Edit name
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleLogout}
                  className="btn-secondary border-rose-200 text-rose-700 hover:bg-rose-50"
                >
                  Sign out
                </button>
              </div>
            </form>
          </div>

          <div>
            <h2 className="font-display text-2xl text-ink">Your listings</h2>
            {loading ? (
              <Spinner />
            ) : myListings.length ? (
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                {myListings.map((listing) => (
                  <div key={listing.id} className="space-y-3">
                    <ListingItem listing={listing} />
                    <div className="flex gap-2">
                      <Link
                        to={`/edit-listing/${listing.id}`}
                        className="btn-secondary flex-1 text-center text-xs"
                      >
                        Edit
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(listing.id)}
                        className="btn-secondary flex-1 border-rose-200 text-xs text-rose-700 hover:bg-rose-50"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-6">
                <EmptyState
                  title="No listings yet"
                  message="Publish your first property and it will appear here."
                  actionLabel="Create listing"
                  actionTo="/create-listing"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
