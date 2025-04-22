import styles from './Spinner.module.css';

interface SpinnerProps {
  className?: string; 
}

export const Spinner = ({ className }: SpinnerProps) => {
  const spinnerClassnames = [
    styles.spinner,
    className
  ].join(' ')

  return (
    <span className={spinnerClassnames} />
  );
};