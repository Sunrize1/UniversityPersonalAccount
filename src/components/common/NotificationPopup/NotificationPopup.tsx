import ErrorIcon from '../../../assets/icons/Edit/red/Close_Icon_Red.svg?react'
import XIconRed from '../../../assets/icons/Edit/red/XIconRed.svg?react'
import WarningIcon from '../../../assets/icons/Edit/red/warning_yellow.svg?react'
import XIconYellow from '../../../assets/icons/Edit/red/XIcon_yellow.svg?react'
import InfoIcon from '../../../assets/icons/Edit/red/info_blue.svg?react'
import XIconBlue from '../../../assets/icons/Edit/red/XIcon_blue.svg?react'
import SuccessIcon from '../../../assets/icons/Edit/red/success_green.svg?react'
import XIconGreen from '../../../assets/icons/Edit/red/XIcon_green.svg?react'
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { removeNotification } from '../../../store/notificationSlice/notificationSlice';
import { NotificationTypeEnum } from '../../../types/redux/NotificationTypeEnum';
import { useIntl } from 'react-intl';
import styles from './NotificationPopup.module.css';

export const NotificationPopup = () => {
    const dispatch = useAppDispatch();
    const notifications = useAppSelector(state => state.notification.notifications);
    const intl = useIntl();

    const translateNotificationType = (type: NotificationTypeEnum) => {
        switch (type) {
            case NotificationTypeEnum.ERROR:
                return intl.formatMessage({ id: 'notificationError' });
            case NotificationTypeEnum.SUCCESS:
                return intl.formatMessage({ id: 'notificationSuccess' });
            case NotificationTypeEnum.INFO:
                return intl.formatMessage({ id: 'notificationInfo' });
            case NotificationTypeEnum.WARNING:
                return intl.formatMessage({ id: 'notificationWarning' });
            default:
                return intl.formatMessage({ id: 'notificationDefault' });
        }
    }

    return (
        <div className={styles.NotificationPopupWrapper}>
            {notifications.map((notification) => (
                <div key={notification.id} 
                className={styles.NotificationPopup + ' ' + styles.animateSlideIn}>
                    <div 
                    className={`${styles.popupHeader} 
                    ${notification.type === NotificationTypeEnum.ERROR? styles.error : ''}
                    ${notification.type === NotificationTypeEnum.SUCCESS? styles.success : ''}
                    ${notification.type === NotificationTypeEnum.INFO? styles.info : ''}
                    ${notification.type === NotificationTypeEnum.WARNING? styles.warning : ''}`}>
                        <div className={styles.popupTitleWrapper }>
                            {notification.type === NotificationTypeEnum.ERROR && <ErrorIcon/>}
                            {notification.type === NotificationTypeEnum.SUCCESS && <SuccessIcon/>}
                            {notification.type === NotificationTypeEnum.INFO && <InfoIcon/>}
                            {notification.type === NotificationTypeEnum.WARNING && <WarningIcon/>}
                            <p className={styles.popupTitle}>{translateNotificationType(notification.type)}</p>
                        </div>
                        <div className={styles.closeIcon} onClick={() => dispatch(removeNotification(notification.id))}>
                            {notification.type === NotificationTypeEnum.ERROR && <XIconRed/>}
                            {notification.type === NotificationTypeEnum.SUCCESS && <XIconGreen/>}
                            {notification.type === NotificationTypeEnum.INFO && <XIconBlue/>}
                            {notification.type === NotificationTypeEnum.WARNING && <XIconYellow/>}
                        </div>
                    </div>
                    <div className={styles.popupContent}>
                        <p className={styles.popupText}>{notification.message}</p>
                    </div>
                </div>
            )
            )}
        </div>
    );
}