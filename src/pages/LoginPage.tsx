
import { useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import Input from '../components/Input';
import Button from '../components/Button';
import styles from '../styles/loginPage.module.css';

interface FormState {
  email: string;
  password: string;
  remember: boolean;
}

interface FormErrors {
  email?: string;
  password?: string;
}

function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormState>({
    email: '',
    password: '',
    remember: true,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPwd, setShowPwd] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setLoading(true);

    window.setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      window.setTimeout(() => navigate('/'), 800);
    }, 600);
  }

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to your account to view orders, save favourites and check out faster."
      image="https://images.unsplash.com/photo-1485518882345-15568b007407?auto=format&fit=crop&w=1200&q=80"
      tagline={{
        title: 'New season. Same craft.',
        sub: 'Hand-finished silhouettes, sourced from artisans across India.',
      }}
      footer={
        <>
          New here? <Link to="/signup">Create an account</Link>
        </>
      }
    >
      {success && (
        <div className={styles.banner} role="status">
          Signed in successfully. Redirecting…
        </div>
      )}

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <Input
          type="email"
          label="Email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          error={errors.email}
        />

        <Input
          type={showPwd ? 'text' : 'password'}
          label="Password"
          required
          autoComplete="current-password"
          placeholder="Enter your password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          error={errors.password}
          rightAdornment={
            <button
              type="button"
              className={styles.pwdToggle}
              onClick={() => setShowPwd((v) => !v)}
              aria-label={showPwd ? 'Hide password' : 'Show password'}
            >
              {showPwd ? 'Hide' : 'Show'}
            </button>
          }
        />

        <div className={styles.row}>
          <label className={styles.remember}>
            <input
              type="checkbox"
              checked={form.remember}
              onChange={(e) => setForm({ ...form, remember: e.target.checked })}
            />
            Remember me
          </label>
          <a href="#forgot" className={styles.forgot}>
            Forgot password?
          </a>
        </div>

        <Button type="submit" size="lg" block loading={loading}>
          Sign in
        </Button>
      </form>

      <div className={styles.divider}>
        <span>or continue with</span>
      </div>

      <div className={styles.socials}>
        <button type="button" className={styles.social}>
          <GoogleIcon />
          <span>Continue with Google</span>
        </button>
        <button type="button" className={styles.social}>
          <AppleIcon />
          <span>Continue with Apple</span>
        </button>
      </div>
    </AuthLayout>
  );
}

function validate(form: FormState): FormErrors {
  const errs: FormErrors = {};
  if (!form.email.trim()) errs.email = 'Please enter your email.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    errs.email = 'Enter a valid email address.';
  if (!form.password) errs.password = 'Please enter your password.';
  else if (form.password.length < 6)
    errs.password = 'Password must be at least 6 characters.';
  return errs;
}

function GoogleIcon(): ReactNode {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M22 12.2c0-.8-.07-1.4-.18-2H12v3.8h5.6c-.24 1.3-.96 2.4-2.05 3.1v2.6h3.3c1.93-1.8 3.05-4.46 3.05-7.5z" fill="#4285F4" />
      <path d="M12 22c2.7 0 5-.9 6.7-2.4l-3.3-2.6c-.92.6-2.1 1-3.4 1-2.6 0-4.8-1.76-5.6-4.1H3v2.6C4.7 19.9 8.1 22 12 22z" fill="#34A853" />
      <path d="M6.4 13.9c-.2-.6-.3-1.25-.3-1.9s.1-1.3.3-1.9V7.5H3a10 10 0 0 0 0 9l3.4-2.6z" fill="#FBBC05" />
      <path d="M12 5.9c1.46 0 2.78.5 3.82 1.5l2.86-2.86C16.97 2.93 14.7 2 12 2 8.1 2 4.7 4.1 3 7.5l3.4 2.6C7.2 7.66 9.4 5.9 12 5.9z" fill="#EA4335" />
    </svg>
  );
}

function AppleIcon(): ReactNode {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.4 12.6c0-2.66 2.18-3.94 2.28-4-1.24-1.81-3.18-2.06-3.86-2.08-1.62-.16-3.18.96-4 .96-.84 0-2.1-.94-3.46-.92-1.78.02-3.42 1.04-4.34 2.64-1.86 3.22-.46 7.96 1.32 10.56.88 1.28 1.92 2.7 3.28 2.66 1.32-.04 1.82-.84 3.42-.84 1.58 0 2.04.84 3.44.82 1.42-.02 2.32-1.3 3.18-2.58.78-1.18 1.18-2.34 1.2-2.4-.04-.02-2.46-.94-2.46-3.8zM13.8 4.84c.7-.86 1.18-2.06 1.04-3.26-1 .04-2.24.66-2.98 1.5-.64.74-1.22 1.96-1.06 3.14 1.12.08 2.28-.58 3-1.38z" />
    </svg>
  );
}

export default LoginPage;
