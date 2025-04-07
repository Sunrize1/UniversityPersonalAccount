import styles from './Button.module.css';
import typography from '../../../styles/typography.module.css';
import { ButtonProps } from '../../../types/components/UI/button';
import { FormattedMessage } from 'react-intl';



export const Button = ({children, onClick, variant = 'primary', className, ...rest} : ButtonProps) => {
    const buttonClasses = [
        styles.btn,
        typography.buttonText,
        variant === 'primary' ? styles.btnPrimary : styles.btnOutline,
        className
    ].join(' ');

    return (
        <button className={buttonClasses} onClick={onClick} {...rest}>
            <FormattedMessage id={children}/>
        </button>
    )
}