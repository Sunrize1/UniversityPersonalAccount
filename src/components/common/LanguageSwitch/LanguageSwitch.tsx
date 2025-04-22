import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import RussianFlag from '../../../assets/icons/Language/Russian.svg?react'
import EnglandFlag from '../../../assets/icons/Language/English.svg?react'
import ArrowDownIcon from '../../../assets/icons/Arrow/black/Caret_Down_MD.svg?react'
import { LanguageEnum } from '../../../types/redux/LanguageEnum';
import styles from './LanguageSwitch.module.css';
import { setLanguage } from '../../../store/userSlice/userSlice';
import { useState } from 'react';

export const LanguageSwitch = () => {
    const currentLanguage = useAppSelector(state => state.user.language);
    const dispatch = useAppDispatch();
    const [isOpen, setIsOpen] = useState(false);

    const translateLanguage = (language: LanguageEnum) => {
        switch (language) {
            case LanguageEnum.RUSSIAN:
                return 'Русский';
            case LanguageEnum.ENGLISH:
                return 'English';
            default:
                return 'Русский';
        }
    }

    const changeLanguage = (language: LanguageEnum) => {
        dispatch(setLanguage(language));
        setIsOpen(false);
    }

    


    return (
        <div className={styles.languageSwitchContainer}>
            <div className={styles.currentLanguage}>
                <p className={styles.languageName}>{translateLanguage(currentLanguage)}</p>
                <div className={styles.flagIcon}>
                    {currentLanguage === LanguageEnum.RUSSIAN ? <RussianFlag/> : ''}
                    {currentLanguage === LanguageEnum.ENGLISH ? <EnglandFlag/> : ''}
                    <div className={styles.openIcon}>
                        <ArrowDownIcon onClick={() => setIsOpen(!isOpen)}/>
                    </div>
                </div>
            </div>
            <div className={styles.languageList + (isOpen ? '' : ' ' + styles.hidden)}>
                <div className={styles.languageItemDivider} onClick={() => changeLanguage(LanguageEnum.RUSSIAN)}>
                    <p className={styles.languageName}>Русский</p>
                    <RussianFlag/>
                </div>
                <div className={styles.languageItem} onClick={() => changeLanguage(LanguageEnum.ENGLISH)}>
                    <p className={styles.languageName}>English</p>
                    <EnglandFlag/>
                </div>
            </div>
        </div>
    )
}