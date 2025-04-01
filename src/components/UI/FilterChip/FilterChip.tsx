import { FilterChipProps } from "../../../types/components/UI/filterChip"
import styles from './FilterChip.module.css';
import typography from '../../../styles/typography.module.css';


export const FilterChip = ({children, variant, leftIcon, rightIcon, ...rest}: FilterChipProps) => {
    const chipClasses = [
        styles.filterChip,
        typography.p2,
        variant === 'primary' ? styles.filterChipPrimary : styles.filterChipOutline
    ].join(' ');

    return (
        <button className={chipClasses} {...rest}>
            {leftIcon && <span className={styles.leftIcon}>{leftIcon}</span>}
            <span>{children}</span>
            {rightIcon && <span className={styles.rightIcon}>{rightIcon}</span>}
        </button>
    )
}