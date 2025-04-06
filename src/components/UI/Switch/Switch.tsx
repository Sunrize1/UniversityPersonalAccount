import { useState } from "react";
import { useFormContext } from "react-hook-form";
import styles from "./Switch.module.css";
import { SwitchProps } from "../../../types/components/UI/switch";

export const Switch = ({ name, label, disabled = false, onChange }: SwitchProps) => {
  const { watch, setValue } = useFormContext();
  const isSelected = watch(name, false); 

  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const handleClick = () => {
    if (!disabled) {
      const newSelected = !isSelected;
      setValue(name, newSelected, { shouldValidate: true });
      if (onChange) onChange(newSelected);
    }
  };

  const handleMouseEnter = () => !disabled && setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  const handleMouseDown = () => !disabled && setIsPressed(true);
  const handleMouseUp = () => setIsPressed(false);

  const switchClasses = [
    styles.switch,
    isSelected ? styles.selected : styles.unselected,
    disabled ? styles.disabled : "",
    isHovered && !disabled ? styles.hovered : "",
    isPressed && !disabled ? styles.pressed : "",
  ]
    .filter(Boolean)
    .join(" ");

  const handleClasses = [
    styles.handle,
    isSelected ? styles.handleSelected : styles.handleUnselected,
    disabled ? styles.handleDisabled : "",
    isHovered && !disabled ? styles.handleHovered : "",
    isPressed && !disabled ? styles.handlePressed : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={styles.switchContainer}>
        <div
        className={switchClasses}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        <div className={handleClasses}></div>
      </div>
      {label && (
        <div className={styles.label}>{label}</div> 
      )}
    </div>
  );
};
