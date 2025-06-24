export interface ImageInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name?: string;
    onFileChange: (file?: File) => void;
}