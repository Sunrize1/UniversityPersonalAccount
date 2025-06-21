export interface DatePickerProps {
    label: string;
    value?: Date;
    onChange: (date: Date | null) => void;
    disabled?: boolean;
    placeholder?: string;
    name?: string;
    className?: string;
} 