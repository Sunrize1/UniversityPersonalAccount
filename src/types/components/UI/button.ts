export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: string;
    onClick: () => void;
    variant?: 'primary' | 'outline';
}