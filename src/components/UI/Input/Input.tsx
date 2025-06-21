import { InputProps } from "../../../types/components/UI/input"
import styles from './Input.module.css';
import typography from '../../../styles/typography.module.css';
import DeleteIconBlack from '../../../assets/icons/Edit/black/Close_Circle.svg?react';
import DeleteIconRed from '../../../assets/icons/Edit/red/Close_Icon_Red.svg?react';
import { forwardRef } from "react";
import { useFormContext } from "react-hook-form";
import { FormattedMessage } from "react-intl";

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, disabled, name, clearable = true, ...rest }, ref) => {
    const {
      watch,
      setValue,
      trigger,
      formState: { errors },
    } = useFormContext();

    const value = watch(name);
    const error = errors[name]?.message as string | undefined;
    const hasValue = Boolean(value);
    const showClearButton = clearable && hasValue && !disabled;

    const handleClear = () => {
      setValue(name, "", { shouldValidate: true });
      trigger(name);
    };


    const textFieldClasses = [
      styles.textField,
      typography.p2,
      error ? styles.error : '',
      disabled ? styles.disabled : '',
    ].filter(Boolean).join(' ');

    return (
      <div className={styles.inputContainer}>
      <div className={textFieldClasses}>
        {label && (
            <label className={styles.labelText} htmlFor={name}>
              <FormattedMessage id={label}/>
            </label>
          )}
        <div className={styles.content}>
        <input
            id={name}
            className={styles.inputText}
            disabled={disabled}
            name={name}
            ref={ref}
            aria-invalid={error ? "true" : "false"}
            {...rest}
          />
          {showClearButton &&  (
            <span 
            className={styles.closeIcon}
            onClick={handleClear}
          >
            {error ? <DeleteIconRed /> : <DeleteIconBlack />}
          </span>
          )}
        </div>
      </div>
      <div className={error ? styles.errorTextVisible : styles.errorTextHidden}>
          <span className={styles.errorText}>{error ? <FormattedMessage id={error}/> : ''}</span>
      </div>
    </div>
    )
  })
