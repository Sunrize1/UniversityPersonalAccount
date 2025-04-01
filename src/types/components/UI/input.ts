export interface inputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
    helperText?: string;
    variant?: 'primary' | 'outline';
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
    fullWidth?: boolean;
    multiline?: boolean;
    rows?: number;
    rowsMax?: number;
    inputRef?: React.RefObject<HTMLInputElement>;
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}