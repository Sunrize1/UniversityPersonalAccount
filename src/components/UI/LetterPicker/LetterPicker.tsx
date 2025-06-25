import { LetterPickerProps } from "../../../types/components/UI/LetterPicker";
import styles from './LetterPicker.module.css';
import ChevronLeftIcon from '../../../assets/icons/Arrow/black/Chevron_Left.svg?react';
import ChevronRightIcon from '../../../assets/icons/Arrow/black/Chevron_Right.svg?react';
import MinusIcon from '../../../assets/icons/Edit/black/Remove_Minus.svg?react';
import { useState, useEffect } from "react";

export const LetterPicker = ({ letters, onLetterClick, selectedLetter }: LetterPickerProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [currentLetterIndex, setCurrentLetterIndex] = useState<number | undefined>(
        selectedLetter ? letters.indexOf(selectedLetter) : undefined
    );

    useEffect(() => {
        if (selectedLetter) {
            setCurrentLetterIndex(letters.indexOf(selectedLetter));
            setIsOpen(true);
        } else {
            setCurrentLetterIndex(undefined);
        }
    }, [selectedLetter, letters]);

    const handleNextClick = () => {
        if(currentLetterIndex == letters.length - 1 || currentLetterIndex === undefined) {
            handleLetterClick(0);
        } else {
            handleLetterClick(currentLetterIndex + 1)
        }
    }

    const handlePreviousClick = () => {
        if(currentLetterIndex === 0 || currentLetterIndex === undefined) {
            handleLetterClick(letters.length - 1);
        } else {
            handleLetterClick(currentLetterIndex - 1)
        }
    }

    const handleLetterClick = (index: number) => {
        setCurrentLetterIndex(index);
        onLetterClick(letters[index]);
    }

    return (
        <div className={styles.letterPicker}>
            <button type="button" disabled={!isOpen} className={styles.leftButton} onClick={handlePreviousClick}><ChevronLeftIcon /></button>
            {isOpen ? letters.map((letter, index) => (
                (selectedLetter
                    ? selectedLetter === letter
                    : currentLetterIndex === index
                ) ? (
                    <span className={styles.selectedLetter} key={letter}>{letter}</span>
                ) : (
                    <button className={styles.letter} key={letter} onClick={() => handleLetterClick(index)}>
                        {letter}
                    </button>
                )
            )) : <div className={styles.letterPickerExpandIcon} onClick={() => setIsOpen(true)}
            >      <span className={styles.inactiveLetter}>{letters[0]}</span>
                    <MinusIcon /> 
                    <span className={styles.inactiveLetter}> {letters[letters.length - 1]}</span>
                 </div>}
            <button type="button" disabled={!isOpen} className={styles.rightButton} onClick={handleNextClick}><ChevronRightIcon /></button>
        </div>
    )
}