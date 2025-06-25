import { FormattedMessage } from "react-intl";
import { ExternalParticipantCardProps } from "../../../types/components/common/ParticipantListProps";
import styles from './ExternalParticipant.module.css'


export const ExternalParticipantCard = ({participant}: ExternalParticipantCardProps) => {

    return (
        <div className={styles.info}>
            <p className={styles.name}>{participant.name}</p>
            <p className={styles.label}>{participant.email}</p>
            <p className={styles.label}>{participant.phone}</p>
            {participant.additionalInfo && (
                <div className={styles.additionalInfo}>
                    <p className={styles.label}><FormattedMessage id={'additionalInformation'}/></p>
                    <p className={styles.text}>{participant.additionalInfo}</p>
                </div>
            )}
        </div>
    )
}