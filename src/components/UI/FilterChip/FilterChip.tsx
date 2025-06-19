import { FilterChipProps } from "../../../types/components/UI/filterChip"
import styles from './FilterChip.module.css';
import typography from '../../../styles/typography.module.css';
import { FormattedMessage } from "react-intl";


export const FilterChip = ({children, variant, leftIcon, rightIcon, className, ...rest}: FilterChipProps) => {
    const chipClasses = [
        styles.filterChip,
        typography.p2,
        variant === 'primary' ? styles.filterChipPrimary : styles.filterChipOutline,
        className
    ].join(' ');

    return (
        <button className={chipClasses} {...rest}>
            {leftIcon && <span className={styles.leftIcon}>{leftIcon}</span>}
            <span><FormattedMessage id={children} /></span>
            {rightIcon && <span className={styles.rightIcon}>{rightIcon}</span>}
        </button>
    )
}