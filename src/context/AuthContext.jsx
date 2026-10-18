import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  delay,
  ensureSeedData,
  getSession,
  getUsers,
  saveUsers,
  setSession,
} from '../services/storage';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ensureSeedData();
    setCurrentUser(getSession());
    setLoading(false);
  }, []);

  const persistUser = useCallback((user) => {
    setSession(user);
    setCurrentUser(user ? { id: user.id, name: user.name, email: user.email } : null);
  }, []);

  const register = useCallback(
    async ({ name, email, password }) => {
      await delay();
      const users = getUsers();
      const exists = users.some((u) => u.email.toLowerCase() === email.toLowerCase());
      if (exists) {
        throw new Error('An account with that email already exists.');
      }
      const user = { id: uuidv4(), name: name.trim(), email: email.trim().toLowerCase(), password };
      saveUsers([...users, user]);
      persistUser(user);
      return user;
    },
    [persistUser]
  );

  const login = useCallback(
    async ({ email, password }) => {
      await delay();
      const users = getUsers();
      const user = users.find(
        (u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password
      );
      if (!user) {
        throw new Error('Invalid email or password.');
      }
      persistUser(user);
      return user;
    },
    [persistUser]
  );

  const logout = useCallback(async () => {
    await delay(150);
    persistUser(null);
  }, [persistUser]);

  const updateProfile = useCallback(
    async ({ name }) => {
      await delay();
      if (!currentUser) throw new Error('You must be signed in.');
      const users = getUsers();
      const next = users.map((u) => (u.id === currentUser.id ? { ...u, name: name.trim() } : u));
      saveUsers(next);
      const updated = next.find((u) => u.id === currentUser.id);
      persistUser(updated);
      return updated;
    },
    [currentUser, persistUser]
  );

  const resetPassword = useCallback(async ({ email }) => {
    await delay();
    const users = getUsers();
    const user = users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());
    if (!user) {
      throw new Error('No account found with that email.');
    }
    return {
      message: `Password reset instructions were sent to ${email.trim().toLowerCase()}.`,
    };
  }, []);

  const value = useMemo(
    () => ({
      currentUser,
      loading,
      register,
      login,
      logout,
      updateProfile,
      resetPassword,
    }),
    [currentUser, loading, register, login, logout, updateProfile, resetPassword]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
