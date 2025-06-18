import styles from './Badge.module.css';
import { BadgeProps } from '../../../types/components/UI/badge';

export const Badge = ({ 
  children, 
  variant = 'default', 
  size = 'medium', 
  className 
}: BadgeProps) => {
  const badgeClasses = [
    styles.badge,
    styles[variant],
    styles[size],
    className
  ].filter(Boolean).join(' ');

  return (
    <span className={badgeClasses}>
      {children}
    </span>
  );
}; 