import { FormattedMessage } from "react-intl";
import { AdminUserProps } from "../../../types/components/common/AdminUsersProps";
import styles from './UserCardRow.module.css';


export const UserCardRow = ({user, onClick}: AdminUserProps) => {

    const handleClick = () => {
        if (onClick) {
            onClick(user);
        }
    }

    return (
        <div className={styles.userCardRow} onClick={handleClick}>
            <p>{user.lastName} {user.firstName} {user.patronymic}</p>
            <div className={styles.row}>
                <p className={styles.rowTitle}><FormattedMessage id="birthDate" /></p>
                <p className={styles.rowValue}>{user.birthDate}</p>
            </div>
            <div className={styles.row}>
                <p className={styles.rowTitle}><FormattedMessage id="email" /></p>
                <p className={styles.rowValue}>{user.email}</p>
            </div>
        </div>
    )
}