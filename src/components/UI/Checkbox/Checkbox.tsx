import { useState } from 'react';
import styles from './Checkbox.module.css';
import { CheckboxProps } from '../../../types/components/UI/checkbox';
import TickIcon from '../../../assets/icons/Interface/white/Check.svg?react';

export const Checkbox = ({ selected = false, disabled = false, onChange }: CheckboxProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const handleClick = () => {
    if (!disabled) {
      const newSelected = !selected;
      if (onChange) onChange(newSelected);
    }
  };

  const handleMouseEnter = () => !disabled && setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  const handleMouseDown = () => !disabled && setIsPressed(true);
  const handleMouseUp = () => setIsPressed(false);

  const checkboxClasses = [
    styles.checkbox,
    selected ? styles.selected : styles.unselected,
    disabled ? styles.disabled : '',
    isHovered && !disabled ? styles.hovered : '',
    isPressed && !disabled ? styles.pressed : '',
  ].filter(Boolean).join(' ');

  const containerClasses = [
    styles.container,
    selected ? styles.containerSelected : styles.containerUnselected,
    disabled ? styles.containerDisabled : '',
  ].filter(Boolean).join(' ');

  return (
    <div
      className={checkboxClasses}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <div className={styles.stateLayer}>
        <div className={containerClasses}>
          {selected && (
            <TickIcon className={styles.checkIcon} width="22" height="22" />
          )}
        </div>
      </div>
      <input
        type="checkbox"
        checked={selected}
        disabled={disabled}
        onChange={() => onChange && onChange(!selected)}
        className={styles.hiddenInput}
      />
    </div>
  );
};