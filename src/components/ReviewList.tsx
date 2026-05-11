
import { useMemo } from 'react';
import type { Review } from '../types';
import Rating from './Rating';
import styles from '../styles/reviewList.module.css';

interface ReviewListProps {
  reviews: Review[];
  maxStars?: number;
  className?: string;
}

function ReviewList({ reviews, maxStars = 5, className = '' }: ReviewListProps) {
  const { average, total, distribution } = useMemo(
    () => summarize(reviews, maxStars),
    [reviews, maxStars],
  );

  if (total === 0) {
    return (
      <div className={`${styles.empty} ${className}`.trim()}>
        No reviews yet — be the first to share your thoughts.
      </div>
    );
  }

  return (
    <section className={`${styles.section} ${className}`.trim()}>
      <div className={styles.summary}>
        <div>
          <div className={styles.summaryTop}>
            <span className={styles.bigNumber}>{average.toFixed(1)}</span>
            <span className={styles.smallMax}>/ {maxStars}</span>
          </div>
          <Rating value={average} size="md" />
          <p className={styles.totalLabel}>
            Based on {total} {total === 1 ? 'review' : 'reviews'}
          </p>
        </div>

        <div className={styles.bars}>
          {[5, 4, 3, 2, 1].map((star) => {
            const count = distribution[star] ?? 0;
            const pct = total === 0 ? 0 : Math.round((count / total) * 100);
            return (
              <div key={star} className={styles.barRow}>
                <span>{star} ★</span>
                <span className={styles.barTrack}>
                  <span
                    className={styles.barFill}
                    style={{ width: `${pct}%` }}
                  />
                </span>
                <span>{pct}%</span>
              </div>
            );
          })}
        </div>
      </div>

      <ol className={styles.list}>
        {reviews.map((r) => (
          <li key={r.id} className={styles.review}>
            <div className={styles.reviewHeader}>
              <Rating value={r.rating} size="sm" />
              <span className={styles.author}>{r.author}</span>
              <span className={styles.date}>· {formatDate(r.date)}</span>
              <span className={styles.size}>· Size {r.size}</span>
              {r.verified && (
                <span className={styles.verified}>
                  <CheckIcon /> Verified buyer
                </span>
              )}
            </div>
            <h4 className={styles.title}>{r.title}</h4>
            <p className={styles.body}>{r.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function summarize(reviews: Review[], maxStars: number) {
  const total = reviews.length;
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  const average = total === 0 ? 0 : sum / total;
  const distribution: Record<number, number> = {};
  for (let s = 1; s <= maxStars; s++) distribution[s] = 0;
  for (const r of reviews) {
    const bucket = Math.round(r.rating);
    distribution[bucket] = (distribution[bucket] ?? 0) + 1;
  }
  return { average, total, distribution };
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export default ReviewList;
