import { useState } from 'react';
import styles from './RadioButton.module.css';
import { RadioButtonProps } from '../../../types/components/UI/radioButton';

export const RadioButton = ({ selected = false, disabled = false, name, value, onChange }: RadioButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const handleClick = () => {
    if (!disabled && !selected && onChange) {
      onChange(value);
    }
  };

  const handleMouseEnter = () => !disabled && setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  const handleMouseDown = () => !disabled && setIsPressed(true);
  const handleMouseUp = () => setIsPressed(false);

  const radioClasses = [
    styles.radio,
    selected ? styles.selected : styles.unselected,
    disabled ? styles.disabled : '',
    isHovered && !disabled ? styles.hovered : '',
    isPressed && !disabled ? styles.pressed : '',
  ].filter(Boolean).join(' ');

  const iconClasses = [
    styles.icon,
    selected ? styles.iconSelected : styles.iconUnselected,
    disabled ? styles.iconDisabled : '',
  ].filter(Boolean).join(' ');

  return (
    <div
      className={radioClasses}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <div className={styles.container}>
        <div className={styles.stateLayer}>
          <div className={iconClasses}></div>
        </div>
      </div>
      <input
        type="radio"
        name={name}
        value={value}
        checked={selected}
        disabled={disabled}
        onChange={() => onChange && onChange(value)}
        className={styles.hiddenInput}
      />
    </div>
  );
};