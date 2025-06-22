import { FormattedMessage } from "react-intl"
import { LanguageSwitch } from "../LanguageSwitch/LanguageSwitch"
import HamburgerIcon from '../../../assets/icons/Interface/black/hamburger.svg?react'
import HamburgerIconActive from '../../../assets/icons/Interface/red/hamburger.svg?react'
import styles from "./Header.module.css"
import {  useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../store/hooks"
import { toggleIsSidebarActive } from "../../../store/UISlice/UISlice"


interface HeaderProps {
    title?: string
}

export const Header = ({title} : HeaderProps) => {
    const dispatch = useAppDispatch();
    const [isHamburgerActive, setIsHamburgerActive] = useState<boolean>(false);
    const isSidebarHidden = useAppSelector(state => state.UISlice.isSidebarHidden);


    const handleHamburgerClick = () => {
        setIsHamburgerActive(true);
        dispatch(toggleIsSidebarActive());
    }

    const containerClass = isSidebarHidden 
        ? `${styles.headerContainer} ${styles.withHamburger}`
        : `${styles.headerContainer} ${styles.withoutHamburger}`;

    return (
        <div className={containerClass}>
            {isSidebarHidden && (
                <div className={styles.hamburgerIcon} onClick={handleHamburgerClick}>
                    <HamburgerIcon/>
                </div>
            )}
            {title && (
                <h1 className={styles.pageTitle}>
                    <FormattedMessage id={title}></FormattedMessage>
                </h1>
            )}
            <div className={styles.languageSwitch}>
                <LanguageSwitch/>
            </div>
        </div>
    )
}