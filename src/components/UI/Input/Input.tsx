import { inputProps } from "../../../types/components/UI/input"
import styles from './Input.module.css';
import typography from '../../../styles/typography.module.css';

export const Input = ({label, disabled, error, ...rest}: inputProps) => {
  const textFieldClasses = [
    styles.textField,
    typography.p2,
    error ? styles.error : '',
    disabled ? styles.disabled : '',
  ].filter(Boolean).join(' ');

    return (
      <>
      <div className={textFieldClasses}>
        <label className={styles.labelText}>{label}</label>
        <div className={styles.content}>
          <input className={styles.inputText} disabled={disabled} {...rest} />
        </div>
      </div>
      <div>
      {error && <span className={styles.errorText}>{error}</span>}
      </div>
    </>
    )
}
