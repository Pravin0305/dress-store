
import Container from '../components/Container';
import Button from '../components/Button';
import styles from '../styles/notFoundPage.module.css';

function NotFoundPage() {
  return (
    <Container size="md">
      <div className={styles.page}>
        <HangerIllustration />
        <p className={styles.code}>404</p>
        <h1 className={styles.title}>This piece is no longer in our collection</h1>
        <p className={styles.message}>
          The page you&apos;re looking for has either moved or never existed.
          Let&apos;s get you back to something beautiful.
        </p>
        <div className={styles.ctaRow}>
          <Button to="/" size="lg">Back to home</Button>
          <Button to="/shop" size="lg" variant="ghost">Browse the shop</Button>
        </div>
      </div>
    </Container>
  );
}

function HangerIllustration() {
  return (
    <svg
      className={styles.illustration}
      viewBox="0 0 200 200"
      fill="none"
      aria-hidden="true"
    >
      {}
      <ellipse cx="100" cy="160" rx="80" ry="10" fill="var(--color-line)" opacity="0.6" />
      {}
      <path
        d="M100 35 c0-8 6-14 14-14 c8 0 14 6 14 14"
        stroke="var(--color-brand)"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      {}
      <path
        d="M100 35 L40 95 L160 95 Z"
        stroke="var(--color-brand)"
        strokeWidth="3"
        strokeLinejoin="round"
        fill="none"
      />
      {}
      <path
        d="M65 95 L90 95 L80 130 L120 130 L110 95 L135 95 L150 175 L50 175 Z"
        fill="var(--color-accent-soft)"
        stroke="var(--color-accent)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {}
      <circle cx="100" cy="145" r="2" fill="var(--color-accent)" />
      <circle cx="92" cy="160" r="1.5" fill="var(--color-accent)" />
      <circle cx="108" cy="160" r="1.5" fill="var(--color-accent)" />
    </svg>
  );
}

export default NotFoundPage;
