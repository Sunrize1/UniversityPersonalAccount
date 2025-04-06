export interface SwitchProps {
    name : string;
    label?: string;
    selected?: boolean; 
    disabled?: boolean; 
    onChange?: (selected: boolean) => void; 
  }