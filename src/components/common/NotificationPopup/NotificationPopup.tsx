import WarningIcon from '../../../assets/icons/Edit/red/Close_Icon_Red.svg?react'
import XIcon from '../../../assets/icons/Edit/red/XIconRed.svg?react'
import styles from './NotificationPopup.module.css';

export const NotificationPopup = () => {
    return (
        <div className={styles.NotificationPopup}>
            <div className={styles.popupHeader + ' ' + styles.warning}>
                <div className={styles.popupTitleWrapper }>
                    <WarningIcon/>
                    <p className={styles.popupTitle}>Ошибка</p>
                </div>
                <XIcon/>
            </div>
            <div className={styles.popupContent}>
                <p className={styles.popupText}>Текст уведомления</p>
            </div>
        </div>
    );
}