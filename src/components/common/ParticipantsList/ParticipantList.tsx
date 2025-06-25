import { useState } from "react";
import { ParticipantListProps } from "../../../types/components/common/ParticipantListProps";
import { EventParticipantType } from "../../../types/api/eventsTypes";
import styles from "./ParticipantList.module.css"
import { InnerParticipantCard } from "../InnerParticipantCard/InnerParticipantCard";
import { ExternalParticipantCard } from "../ExternalParticipantCard/ExternalParticipantCard";
import { FormattedMessage } from "react-intl";


export const ParticipantList = ({ participants }: ParticipantListProps) => {
    const [activeTab, setActiveTab] = useState<'inner' | 'external'>('inner');

    const innerParticipants = participants.filter(
        (p) => p.participantType === EventParticipantType.Inner
    );
    const externalParticipants = participants.filter(
        (p) => p.participantType === EventParticipantType.External
    );

    return (
        <div className={styles.container}>
            <div className={styles.tabs}>
                <button
                    className={`${styles.tab} ${activeTab === 'inner' ? styles.activeTab : ''}`}
                    onClick={() => setActiveTab('inner')}
                >
                    <h3><FormattedMessage id={'innerParticipants'}/></h3>
                </button>
                <button
                    className={`${styles.tab} ${activeTab === 'external' ? styles.activeTab : ''}`}
                    onClick={() => setActiveTab('external')}
                >
                    <h3><FormattedMessage id={'externalParticipants'}/></h3>
                </button>
            </div>
                {activeTab === 'inner' && (
                    <div className={styles.participantsList}>
                        {innerParticipants.length === 0 ? (
                            <div><FormattedMessage id={'noParticipants'}/></div>
                        ) : (
                            innerParticipants.map((participant) => (
                                <InnerParticipantCard key={participant.id} participant={participant} />
                            ))
                        )}
                    </div>
                )}
                {activeTab === 'external' && (
                    <div className={styles.participantsList}>
                        {externalParticipants.length === 0 ? (
                            <div><FormattedMessage id={'noParticipants'}/></div>
                        ) : (
                            externalParticipants.map((participant) => (
                                <ExternalParticipantCard participant={participant}/>
                            ))
                        )}
                    </div>
                )}
        </div>
    );
};