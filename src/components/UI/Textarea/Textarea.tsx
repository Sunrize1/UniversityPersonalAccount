import { TextareaHTMLAttributes, forwardRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import styles from './Textarea.module.css';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, name, disabled, ...rest }, ref) => {
    const {
      formState: { errors },
    } = useFormContext();

    const error = errors[name]?.message as string | undefined;

    const textFieldClasses = [
      styles.textField,
      error ? styles.error : '',
      disabled ? styles.disabled : '',
    ].filter(Boolean).join(' ');

    return (
      <div className={styles.textareaContainer}>
        <div className={textFieldClasses}>
          {label && (
            <label className={styles.labelText} htmlFor={name}>
              <FormattedMessage id={label} />
            </label>
          )}
          <textarea
            id={name}
            className={styles.textarea}
            disabled={disabled}
            name={name}
            ref={ref}
            aria-invalid={error ? "true" : "false"}
            {...rest}
          />
        </div>
        <div className={error ? styles.errorTextVisible : styles.errorTextHidden}>
          <span className={styles.errorText}>
            {error ? <FormattedMessage id={error} /> : ''}
          </span>
        </div>
      </div>
    );
  }
); 