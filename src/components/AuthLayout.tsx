
import type { ReactNode } from 'react';
import styles from '../styles/authLayout.module.css';

interface AuthLayoutProps {
  title: string;
  subtitle?: string;
  image: string;
  tagline?: { title: string; sub: string };
  children: ReactNode;
  footer?: ReactNode;
}

function AuthLayout({
  title,
  subtitle,
  image,
  tagline,
  children,
  footer,
}: AuthLayoutProps) {
  return (
    <div className={styles.layout}>
      <aside className={styles.visual} aria-hidden="true">
        <img className={styles.visualImg} src={image} alt="" loading="eager" />
        <div className={styles.visualOverlay} />
        <div className={styles.visualContent}>
          <span className={styles.brand}>Dress Store</span>
          {tagline && (
            <div className={styles.tagline}>
              <h2 className={styles.taglineTitle}>{tagline.title}</h2>
              <p className={styles.taglineSub}>{tagline.sub}</p>
            </div>
          )}
        </div>
      </aside>

      <main className={styles.formSide}>
        <div className={styles.formCard}>
          <header className={styles.header}>
            <h1 className={styles.title}>{title}</h1>
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </header>

          {children}

          {footer && <p className={styles.footerNote}>{footer}</p>}
        </div>
      </main>
    </div>
  );
}

export default AuthLayout;
