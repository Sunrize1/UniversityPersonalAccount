import styles from './AdminServiceCard.module.css';
import { Service } from '../../../types/components/common/AdminServiceCardListProps';

export const AdminServiceCard = ({service, onClick}: {service: Service, onClick: () => void}) => {
    return (
        <div className={styles.card} onClick={onClick}>
            <div className={styles.cardHeader}> 
                <div className={styles.icon}>{service.icon}</div>
                <h3 className={styles.cardTitle}>{service.name}</h3>
            </div>
            <p>{service.description}</p>
        </div>
    )
}