export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    name:string;
    helperText?: string;
    clearable?: boolean;
    variant?: 'primary' | 'outline';
}