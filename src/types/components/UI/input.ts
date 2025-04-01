export interface inputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
    helperText?: string;
    variant?: 'primary' | 'outline';
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}