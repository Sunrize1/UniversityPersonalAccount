import React, { useState, useRef } from 'react'
import styles from './imageInput.module.css'
import { ImageInputProps } from '../../../types/components/UI/imageInput'
import UploadImageIcon from '../../../assets/icons/File/black/UploadImage.svg?react'
import ImageIcon from '../../../assets/icons/File/black/Image.svg?react'
import ClearIcon from '../../../assets/icons/Edit/black/Close_Circle.svg?react'
import { FormattedMessage } from 'react-intl'

export const ImageInput = ({name, onFileChange}: ImageInputProps ) => {
    const [fileName, setFileName] = useState<string | undefined>(name)
    const inputRef = useRef<HTMLInputElement | null>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFileName(e.target.files[0].name)
            onFileChange(e.target.files[0])
        } else {
            setFileName(undefined)
            onFileChange(undefined)
        }
    }

    const handleClear = () => {
        setFileName(undefined)
        if (inputRef.current) {
            inputRef.current.value = ''
        }
       onFileChange(undefined)
    }

    return (
        <div className={styles.inputContainer}>
            <div className={styles.content}>
                {fileName ? <ImageIcon/> : <UploadImageIcon/>}
                <label>
                    {fileName ? fileName : <FormattedMessage id='uploadImage'/> }
                    
                </label>
                <input 
                    type="file"
                    accept="image/*"
                    onChange={handleChange}
                    className={styles.inputFile}
                    ref={inputRef}
                />
                {fileName && (
                    <span className={styles.clearIcon}
                          onClick={handleClear}>
                        <ClearIcon/>
                    </span>
                )}
            </div>
        </div>
    )
}