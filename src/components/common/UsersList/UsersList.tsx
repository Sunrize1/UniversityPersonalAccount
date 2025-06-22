import { useIntl } from "react-intl";
import { AdminUsersProps, CardType } from "../../../types/components/common/AdminUsersProps";
import { Spinner } from "../../UI/Spinner/Spinner";
import styles from './UsersList.module.css';
import HamburgerIconBlack from '../../../assets/icons//Interface/black/hamburger.svg?react'
import HamburgerIconBlue from '../../../assets/icons//Interface/red/hamburger.svg?react'
import GridIconBlack from '../../../assets/icons//Interface/black/More_Grid_Big.svg?react'
import GridIconBlue from '../../../assets/icons//Interface/red/More_Grid_Big.svg?react'
import { UserCardRow } from "../UserCardRow/UserCardRow";
import { Pagination } from "../../UI/Pagination/Pagination";
import { FC, useState } from "react";
import { UserCardCol } from "../UserCardCol/UserCardCol";

export const UsersList: FC<AdminUsersProps> = ({users, pagination, onUserClick, onPageChange, isLoading = false}) => {
    const intl = useIntl();
    const [cardType, setCardType] = useState<CardType>(CardType.row)
    if (isLoading) {
        return (
            <div className={styles.loadingContainer}>
                <Spinner />
            </div>
        )
    }

    if (users.length === 0) {
        return (
          <div className={styles.container}>
            <div className={styles.emptyState}>
              <h3 className={styles.emptyStateTitle}>
                {intl.formatMessage({ id: 'noUsersFound' })}
              </h3>
              <p className={styles.emptyStateText}>
                {intl.formatMessage({ id: 'noUsersFoundText' })}
              </p>
            </div>
          </div>
        );
      }


    return (
       <div className={styles.container}>
        <div className={styles.formPicker}>
            <button disabled={cardType == CardType.row} 
                    className={cardType == CardType.row ? styles.activeIcon : styles.icon}
                    onClick={() => setCardType(CardType.row)}>
                {cardType == CardType.row ? <HamburgerIconBlue/> : <HamburgerIconBlack/> }
            </button>
            <button disabled={cardType == CardType.col} 
                    className={cardType == CardType.col ? styles.activeIcon : styles.icon}
                    onClick={() => setCardType(CardType.col)}>
                {cardType == CardType.col ? <GridIconBlue/> : <GridIconBlack/>}
            </button>
        </div>
         {cardType == CardType.row ? (
            <div className={styles.usersListRow}>
                {users.map((user) => (
                    <UserCardRow key={user.id} user={user} onClick={onUserClick} />
                ))}
            </div>
         ) : 
         <div className={styles.usersListCol}>
                {users.map((user) => (
                    <UserCardCol key={user.id} user={user} onClick={onUserClick} />
                ))}
            </div>}
        {pagination && onPageChange && (
            <Pagination pagination={pagination} onPageChange={onPageChange} />
        )}
       </div>
    )
}