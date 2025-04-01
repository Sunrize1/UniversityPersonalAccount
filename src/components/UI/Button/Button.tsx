import styles from './Button.module.css';
import typography from '../../../styles/typography.module.css';
import { ButtonProps } from '../../../types/components/UI/button';



export const Button = ({children, onClick, variant = 'primary', ...rest} : ButtonProps) => {
    const buttonClasses = [
        styles.btn,
        typography.buttonText,
        variant === 'primary' ? styles.btnPrimary : styles.btnOutline
    ].join(' ');

    return (
        <button className={buttonClasses} onClick={onClick} {...rest}>
            {children}
        </button>
    )
}