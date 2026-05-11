
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/button.module.css';

type Variant = 'primary' | 'secondary' | 'ghost' | 'accent' | 'danger';
type Size = 'sm' | 'md' | 'lg';

interface BaseProps {
  variant?: Variant;
  size?: Size;
  block?: boolean;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
  children: ReactNode;
}

type ButtonAsButton = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    to?: undefined;
    href?: undefined;
  };

type ButtonAsLink = BaseProps & {
  to: string;
  href?: undefined;
};

type ButtonAsAnchor = BaseProps & {
  href: string;
  to?: undefined;
  target?: string;
  rel?: string;
};

type ButtonProps = ButtonAsButton | ButtonAsLink | ButtonAsAnchor;

function Button(props: ButtonProps) {
  const {
    variant = 'primary',
    size = 'md',
    block = false,
    loading = false,
    leftIcon,
    rightIcon,
    className = '',
    children,
  } = props;

  const classes = [
    styles.btn,
    styles[variant],
    styles[size],
    block ? styles.block : '',
    loading ? styles.loading : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      {loading ? (
        <span className={styles.spinner} aria-hidden="true" />
      ) : leftIcon ? (
        <span className={styles.icon} aria-hidden="true">{leftIcon}</span>
      ) : null}
      <span className={styles.label}>{children}</span>
      {!loading && rightIcon && (
        <span className={styles.icon} aria-hidden="true">{rightIcon}</span>
      )}
    </>
  );

  if ('to' in props && props.to !== undefined) {
    return (
      <Link to={props.to} className={classes} aria-busy={loading || undefined}>
        {content}
      </Link>
    );
  }

  if ('href' in props && props.href !== undefined) {
    const { href, target, rel } = props;
    return (
      <a
        href={href}
        target={target}
        rel={rel ?? (target === '_blank' ? 'noopener noreferrer' : undefined)}
        className={classes}
        aria-busy={loading || undefined}
      >
        {content}
      </a>
    );
  }

  const { variant: _v, size: _s, block: _b, loading: _l, leftIcon: _li, rightIcon: _ri,
    className: _c, children: _ch, ...rest } = props as ButtonAsButton;
  void _v; void _s; void _b; void _l; void _li; void _ri; void _c; void _ch;

  return (
    <button
      type="button"
      {...rest}
      className={classes}
      disabled={rest.disabled || loading}
      aria-busy={loading || undefined}
    >
      {content}
    </button>
  );
}

export default Button;
