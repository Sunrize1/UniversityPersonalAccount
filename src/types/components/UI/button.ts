export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: string;
    onClick?: () => void;
    className?: string;
    variant?: 'primary' | 'outline';
}