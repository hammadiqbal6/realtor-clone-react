import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Spinner from './Spinner';

export default function GuestRoute({ children }) {
  const { currentUser, loading } = useAuth();

  if (loading) return <Spinner label="Checking session…" />;
  if (currentUser) {
    return <Navigate to="/profile" replace />;
  }
  return children;
}
