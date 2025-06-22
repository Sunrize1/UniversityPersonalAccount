import { AdminServiceCardListProps } from "../../../types/components/common/AdminServiceCardListProps"
import { AdminServiceCard } from "../AdminServiceCard/AdminServiceCard"
import styles from './AdminServiceCardList.module.css';


export const AdminServiceCardList = (props: AdminServiceCardListProps) => {
    return (
        <div className={styles.cardList}>
            {props.services.map((service) => (
                <AdminServiceCard key={service.id} service={service} onClick={service.onClick} />
            ))}
        </div>
    )
}