import { API_BASE_URL } from "../../../api/instance";
import { EventParticipantDto } from "../../../types/api/eventsTypes";
import { InnerParticipantCardProps } from "../../../types/components/common/ParticipantListProps";
import styles from './InnerParticipantCard.module.css'


export const InnerParticipantCard = ({participant}: InnerParticipantCardProps) => {


    return (
        <div className={styles.innerCard}>
            <div className={styles.avatarContainer}>
            <img 
                   src={`${API_BASE_URL}/Files/${participant.user.avatar.id}`} 
                   alt={participant.name}
                   className={styles.avatarImage}
                   onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.nextElementSibling?.setAttribute('style', 'display: flex');
                  }}/>
            </div>
            <div className={styles.info}>
                <div className={styles.name}>{participant.user.lastName + " " + participant.user.firstName + " " + participant.user.patronymic}</div>
                <div className={styles.email}>{participant.user.email}</div>
            </div>
        </div>
    )
}