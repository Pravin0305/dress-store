
import { useEffect, useRef, useState } from 'react';
import type { ImgHTMLAttributes } from 'react';
import styles from '../styles/lazyImage.module.css';

type LazyImageProps = ImgHTMLAttributes<HTMLImageElement>;

function LazyImage({
  className = '',
  loading = 'lazy',
  decoding = 'async',
  onLoad,
  ...rest
}: LazyImageProps) {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (ref.current?.complete && ref.current.naturalWidth > 0) {
      setLoaded(true);
    }
  }, []);

  return (
    <img
      ref={ref}
      loading={loading}
      decoding={decoding}
      onLoad={(e) => {
        setLoaded(true);
        onLoad?.(e);
      }}
      className={`${styles.img} ${loaded ? styles.loaded : ''} ${className}`.trim()}
      {...rest}
    />
  );
}

export default LazyImage;
