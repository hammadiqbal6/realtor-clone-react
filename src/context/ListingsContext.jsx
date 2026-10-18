import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { delay, ensureSeedData, getListings, saveListings } from '../services/storage';
import { useAuth } from './AuthContext';

const ListingsContext = createContext(null);

export function ListingsProvider({ children }) {
  const { currentUser } = useAuth();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await delay(200);
      ensureSeedData();
      setListings(getListings());
    } catch (err) {
      setError(err.message || 'Failed to load listings.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const getListingById = useCallback(
    (id) => listings.find((listing) => listing.id === id) || null,
    [listings]
  );

  const createListing = useCallback(
    async (payload) => {
      if (!currentUser) throw new Error('Sign in to create a listing.');
      await delay();
      const listing = {
        ...payload,
        id: uuidv4(),
        userRef: currentUser.id,
        createdAt: new Date().toISOString(),
      };
      const next = [listing, ...getListings()];
      saveListings(next);
      setListings(next);
      return listing;
    },
    [currentUser]
  );

  const updateListing = useCallback(
    async (id, payload) => {
      if (!currentUser) throw new Error('Sign in to edit a listing.');
      await delay();
      const existing = getListings().find((l) => l.id === id);
      if (!existing) throw new Error('Listing not found.');
      if (existing.userRef !== currentUser.id) {
        throw new Error('You can only edit your own listings.');
      }
      const next = getListings().map((l) =>
        l.id === id ? { ...l, ...payload, id, userRef: currentUser.id } : l
      );
      saveListings(next);
      setListings(next);
      return next.find((l) => l.id === id);
    },
    [currentUser]
  );

  const deleteListing = useCallback(
    async (id) => {
      if (!currentUser) throw new Error('Sign in to delete a listing.');
      await delay();
      const existing = getListings().find((l) => l.id === id);
      if (!existing) throw new Error('Listing not found.');
      if (existing.userRef !== currentUser.id) {
        throw new Error('You can only delete your own listings.');
      }
      const next = getListings().filter((l) => l.id !== id);
      saveListings(next);
      setListings(next);
    },
    [currentUser]
  );

  const value = useMemo(
    () => ({
      listings,
      loading,
      error,
      refresh,
      getListingById,
      createListing,
      updateListing,
      deleteListing,
    }),
    [listings, loading, error, refresh, getListingById, createListing, updateListing, deleteListing]
  );

  return <ListingsContext.Provider value={value}>{children}</ListingsContext.Provider>;
}

export function useListings() {
  const ctx = useContext(ListingsContext);
  if (!ctx) throw new Error('useListings must be used within ListingsProvider');
  return ctx;
}
