export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'success-light' | 'black' | 'warning' | 'error' | 'info' | 'default';
  size?: 'small' | 'medium' | 'large';
  className?: string;
} 