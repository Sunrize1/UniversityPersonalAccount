export interface LetterPickerProps {
    letters: string[];
    onLetterClick: (letter: string) => void;
    selectedLetter?: string;
}