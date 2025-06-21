import { forwardRef, ChangeEvent } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import DeleteIconBlack from '../../../assets/icons/Edit/black/Close_Circle.svg?react';
import DeleteIconRed from '../../../assets/icons/Edit/red/Close_Icon_Red.svg?react';
import styles from './PhoneInput.module.css';

interface PhoneInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  clearable?: boolean;
}

const formatPhoneNumber = (value: string): string => {
  if (!value) return '+7 ';
  
  const numbers = value.replace(/\D/g, '');
  
  const digits = numbers.startsWith('7') ? numbers.slice(1) : numbers;
  
  const limitedDigits = digits.substring(0, 10);
  
  let formatted = '+7';
  
  if (limitedDigits.length > 0) {
    formatted += ` (${limitedDigits.substring(0, 3)}`;
    
    if (limitedDigits.length > 3) {
      formatted += `) ${limitedDigits.substring(3, 6)}`;
      
      if (limitedDigits.length > 6) {
        formatted += `-${limitedDigits.substring(6, 8)}`;
        
        if (limitedDigits.length > 8) {
          formatted += `-${limitedDigits.substring(8, 10)}`;
        }
      }
    }
  }
  
  return formatted;
};

export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ label, disabled, name, clearable = true, onChange, ...rest }, ref) => {
    const {
      watch,
      setValue,
      trigger,
      formState: { errors },
    } = useFormContext();

    const value = watch(name) || '';
    const error = errors[name]?.message as string | undefined;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const formatted = formatPhoneNumber(e.target.value);
      
      const formattedEvent = {
        ...e,
        target: {
          ...e.target,
          value: formatted,
        },
      };

      setValue(name, formatted, { shouldValidate: true });
      trigger(name);
      
      if (onChange) {
        onChange(formattedEvent as ChangeEvent<HTMLInputElement>);
      }
    };

    const handleClear = () => {
      setValue(name, '', { shouldValidate: true });
      trigger(name);
    };

    const hasValue = Boolean(value);
    const showClearButton = clearable && hasValue && !disabled;

    const textFieldClasses = [
      styles.textField,
      error ? styles.error : '',
      disabled ? styles.disabled : '',
    ].filter(Boolean).join(' ');

    return (
      <div className={styles.inputContainer}>
        <div className={textFieldClasses}>
          {label && (
            <label className={styles.labelText} htmlFor={name}>
              <FormattedMessage id={label} />
            </label>
          )}
          <div className={styles.content}>
            <input
              id={name}
              className={styles.inputText}
              disabled={disabled}
              name={name}
              ref={ref}
              value={value}
              onChange={handleChange}
              placeholder="+7 (___) ___-__-__"
              type="tel"
              aria-invalid={error ? "true" : "false"}
              {...rest}
            />
            {showClearButton && (
              <span className={styles.closeIcon} onClick={handleClear}>
                {error ? <DeleteIconRed /> : <DeleteIconBlack />}
              </span>
            )}
          </div>
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