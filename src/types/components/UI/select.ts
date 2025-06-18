export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  name: string;
  options: SelectOption[];
  placeholder?: string;
  helperText?: string;
  variant?: 'primary' | 'outline';
} 