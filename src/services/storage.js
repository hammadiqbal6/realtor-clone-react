import { SAMPLE_LISTINGS, SAMPLE_USERS } from '../data/sampleListings';

const USERS_KEY = 'harborhomes.users';
const SESSION_KEY = 'harborhomes.session';
const LISTINGS_KEY = 'harborhomes.listings';

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function write(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function ensureSeedData() {
  if (!localStorage.getItem(USERS_KEY)) {
    write(USERS_KEY, SAMPLE_USERS);
  }
  if (!localStorage.getItem(LISTINGS_KEY)) {
    write(LISTINGS_KEY, SAMPLE_LISTINGS);
  }
}

export function getUsers() {
  ensureSeedData();
  return read(USERS_KEY, SAMPLE_USERS);
}

export function saveUsers(users) {
  write(USERS_KEY, users);
}

export function getSession() {
  return read(SESSION_KEY, null);
}

export function setSession(user) {
  if (!user) {
    localStorage.removeItem(SESSION_KEY);
    return;
  }
  const { password, ...safeUser } = user;
  write(SESSION_KEY, safeUser);
}

export function getListings() {
  ensureSeedData();
  return read(LISTINGS_KEY, SAMPLE_LISTINGS);
}

export function saveListings(listings) {
  write(LISTINGS_KEY, listings);
}

export function delay(ms = 350) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
