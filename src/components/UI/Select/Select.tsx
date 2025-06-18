import { SelectProps } from "../../../types/components/UI/select";
import styles from './Select.module.css';
import typography from '../../../styles/typography.module.css';
import ChevronDownIcon from '../../../assets/icons/Arrow/red/Chevron_Down.svg?react';
import { forwardRef } from "react";
import { useFormContext } from "react-hook-form";
import { FormattedMessage } from "react-intl";

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, disabled, name, options, placeholder = '', ...rest }, ref) => {
    const {
      watch,
      setValue,
      trigger,
      formState: { errors },
    } = useFormContext();

    const value = watch(name);
    const error = errors[name]?.message as string | undefined;

    const textFieldClasses = [
      styles.textField,
      typography.p2,
      error ? styles.error : '',
      disabled ? styles.disabled : '',
    ].filter(Boolean).join(' ');

    return (
      <div className={styles.selectContainer}>
        <div className={textFieldClasses}>
          {label && (
            <label className={styles.labelText} htmlFor={name}>
              <FormattedMessage id={label} />
            </label>
          )}
          <div className={styles.content}>
            <select
              id={name}
              className={styles.selectElement}
              disabled={disabled}
              name={name}
              ref={ref}
              value={value || ''}
              onChange={(e) => {
                setValue(name, e.target.value, { shouldValidate: true });
                trigger(name);
              }}
              aria-invalid={error ? "true" : "false"}
              {...rest}
            >
              {placeholder && (
                <option value="" disabled>
                  <FormattedMessage id={placeholder} />
                </option>
              )}
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  <FormattedMessage id={option.label} />
                </option>
              ))}
            </select>
            <div className={styles.iconWrapper}>
              <ChevronDownIcon />
            </div>
          </div>
        </div>
        <div className={error ? styles.errorTextVisible : styles.errorTextHidden}>
          <span className={styles.errorText}>{error ? <FormattedMessage id={error} /> : ''}</span>
        </div>
      </div>
    )
  })

Select.displayName = 'Select'; 