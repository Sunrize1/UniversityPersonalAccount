import { FormattedMessage } from "react-intl";
import { AdminUserProps } from "../../../types/components/common/AdminUsersProps";
import styles from './UserCardCol.module.css';


export const UserCardCol = ({user, onClick}: AdminUserProps) => {

    const handleClick = () => {
        if (onClick) {
            onClick(user);
        }
    }

    return (
        <div className={styles.userCardCol} onClick={handleClick}>
            <div className={styles.userCardHeader}>
                <h3>{user.lastName} {user.firstName} {user.patronymic}</h3>
            </div>
            <div className={styles.userCardContent}>
                <div className={styles.col}>
                    <p className={styles.colTitle}><FormattedMessage id="birthDate" /></p>
                    <p className={styles.colValue}>{user.birthDate}</p>
                </div>
                <div className={styles.col}>
                    <p className={styles.colTitle}><FormattedMessage id="email" /></p>
                    <p className={styles.colValue}>{user.email}</p>
                </div>
            </div>
        </div>
    )
}