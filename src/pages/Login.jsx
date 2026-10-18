import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      setSubmitting(true);
      await login(form);
      toast.success('Welcome back');
      navigate(location.state?.from || '/profile', { replace: true });
    } catch (err) {
      setError(err.message || 'Unable to sign in.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="relative overflow-hidden px-4 py-14 sm:px-6 sm:py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(196,92,38,0.1),transparent_55%)]" />
      <div className="relative mx-auto grid max-w-5xl items-center gap-10 lg:grid-cols-2">
        <div className="hidden lg:block">
          <img
            src="https://images.unsplash.com/photo-1600047509807-ba8f99d2cd00?auto=format&fit=crop&w=1200&q=80"
            alt="Bright living room"
            className="h-[520px] w-full rounded-3xl object-cover shadow-xl"
          />
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-[0_24px_60px_-36px_rgba(12,27,42,0.45)] ring-1 ring-ink/5 sm:p-10">
          <h1 className="font-display text-3xl text-ink sm:text-4xl">Sign in</h1>
          <p className="mt-2 text-sm text-ink/60">
            Demo account: <span className="font-medium text-ink">demo@harborhomes.dev</span> /{' '}
            <span className="font-medium text-ink">demo1234</span>
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {error ? (
              <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
                {error}
              </div>
            ) : null}

            <label className="field">
              <span>Email</span>
              <input
                type="email"
                autoComplete="email"
                required
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              />
            </label>

            <label className="field">
              <span>Password</span>
              <input
                type="password"
                autoComplete="current-password"
                required
                value={form.password}
                onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
              />
            </label>

            <div className="flex justify-end">
              <Link
                to="/reset-password"
                className="text-sm font-medium text-accent hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <button type="submit" className="btn-primary w-full" disabled={submitting}>
              {submitting ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-ink/60">
            Don&apos;t have an account?{' '}
            <Link to="/register" className="font-semibold text-accent hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
