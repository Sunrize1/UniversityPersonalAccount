export interface RadioButtonProps {
    selected?: boolean; 
    disabled?: boolean; 
    name: string; 
    value: string; 
    onChange?: (value: string) => void; 
  }