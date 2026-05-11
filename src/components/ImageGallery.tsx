
import { useEffect, useState } from 'react';
import LazyImage from './LazyImage';
import styles from '../styles/imageGallery.module.css';

interface ImageGalleryProps {
  images: string[];
  alt: string;
}

function ImageGallery({ images, alt }: ImageGalleryProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [images]);

  if (images.length === 0) return null;

  const safeIndex = Math.min(index, images.length - 1);
  const total = images.length;

  function prev() { setIndex((i) => (i - 1 + total) % total); }
  function next() { setIndex((i) => (i + 1) % total); }

  return (
    <div className={styles.gallery}>
      <div className={styles.main}>
        <LazyImage
          key={images[safeIndex]}
          src={images[safeIndex]}
          alt={`${alt} — photo ${safeIndex + 1}`}
          className={styles.mainImg}
          loading="eager"
        />

        {total > 1 && (
          <>
            <button
              type="button"
              className={`${styles.nav} ${styles.prev}`}
              onClick={prev}
              aria-label="Previous image"
            >
              <ChevronIcon dir="left" />
            </button>
            <button
              type="button"
              className={`${styles.nav} ${styles.next}`}
              onClick={next}
              aria-label="Next image"
            >
              <ChevronIcon dir="right" />
            </button>
            <span className={styles.counter}>
              {safeIndex + 1} / {total}
            </span>
          </>
        )}
      </div>

      {total > 1 && (
        <div
          className={styles.thumbs}
          role="tablist"
          aria-label="Product images"
        >
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              role="tab"
              aria-selected={i === safeIndex}
              className={`${styles.thumb} ${i === safeIndex ? styles.thumbSelected : ''}`}
              onClick={() => setIndex(i)}
            >
              <LazyImage
                src={src}
                alt=""
                className={styles.thumbImg}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ChevronIcon({ dir }: { dir: 'left' | 'right' }) {
  return (
    <svg
      width="16" height="16" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
      style={{ transform: dir === 'left' ? 'rotate(180deg)' : undefined }}
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

export default ImageGallery;
