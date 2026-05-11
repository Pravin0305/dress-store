
import type { ElementType, ReactNode } from 'react';
import styles from '../styles/container.module.css';

export type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'full';

interface ContainerProps {
  size?: ContainerSize;
  as?: ElementType;
  className?: string;
  children: ReactNode;
}

function Container({
  size = 'xl',
  as: Tag = 'div',
  className = '',
  children,
}: ContainerProps) {
  const classes = [styles.container, styles[size], className]
    .filter(Boolean)
    .join(' ');
  return <Tag className={classes}>{children}</Tag>;
}

export default Container;
