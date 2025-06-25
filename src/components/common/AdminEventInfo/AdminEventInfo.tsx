import { FormattedDate, useIntl } from "react-intl"
import { AdminEventInfoProps } from "../../../types/components/common/EventInfoProps"
import styles from './AdminEventInfo.module.css'
import { EventAuditory, EventFormat, EventStatus, EventType } from "../../../types/api/eventsTypes"
import { ReactNode, useState } from "react"
import dayjs from "dayjs"
import ChevronDownIcon from '../../../assets/icons/Arrow/black/Caret_Down_MD.svg?react';
import ChevronUpIcon from '../../../assets/icons/Arrow/black/Caret_Up_MD.svg?react';
import { API_BASE_URL } from "../../../api/instance"
import { InteractiveMap } from "../EventMap/InteractiveMap"
import { ParticipantList } from "../ParticipantsList/ParticipantList"
import { EditEventStatusSelect } from "../../UI/EditEventStatusSelect/EditEventStatusSelect"
import EditIcon from '../../../assets/icons/Edit/black/Edit_Pencil_Line_01.svg?react';
import DeleteIcon from '../../../assets/icons/Edit/black/Trash_Full.svg?react';
import { editEventStatus } from "../../../api/requests/EditEventStatus"
import { showNotification } from "../../../utils/notification"
import { useAppDispatch } from "../../../store/hooks"
import { NotificationTypeEnum } from "../../../types/redux/NotificationTypeEnum"
import { deleteEvent } from "../../../api/requests/deleteEvent"
import { useNavigate } from "react-router-dom"

export const AdminEventInfo = ({ event, onEdit }: AdminEventInfoProps) => {
    const intl = useIntl()
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)

    const formatDate = (
        dateTimeFrom: string,
        dateTimeTo: string,
        isTimeFromNeeded: boolean,
        isTimeToNeeded: boolean
    ): ReactNode => {
        const from = dayjs(dateTimeFrom)
        const to = dayjs(dateTimeTo)
        const isSameDay = from.isSame(to, 'day')
        if (isSameDay) {
            return <>
                <FormattedDate value={dateTimeFrom} year="numeric" month="2-digit" day="2-digit" />
                {isTimeFromNeeded && isTimeToNeeded && (
                    <> ({from.format('HH:mm')} - {to.format('HH:mm')})</>
                )}
                {isTimeFromNeeded && !isTimeToNeeded && (
                    <> ({from.format('HH:mm')})</>
                )}
            </>
        } else {
            return <>
                <FormattedDate value={dateTimeFrom} year="numeric" month="2-digit" day="2-digit" />
                {isTimeFromNeeded && (
                    <> ({from.format('HH:mm')})</>
                )}
                {' - '}
                <FormattedDate value={dateTimeTo} year="numeric" month="2-digit" day="2-digit" />
                {isTimeToNeeded && (
                    <> ({to.format('HH:mm')})</>
                )}
            </>
        }
    }

    const getFormatText = (format: EventFormat) => {
       switch (format) {
           case EventFormat.Offline:
                 return 'eventFormatOffline'
           case EventFormat.Online:
                 return 'eventFormatOnline'
           default:
                 return 'eventFormatOffline'
       }
    }

    const getBooleanText = (bool: boolean) => {
        return bool ? "yes" : "no"
    }

    const getEventTypeText = (type: EventType) => {
        switch (type) {
            case EventType.Close:
                return 'eventTypeClose'
            case EventType.Open:
                return 'eventTypeOpen'
            default:
                return 'eventTypeClose'
        }
    }

    const getAudienceText = (audience: EventAuditory) => {
        switch (audience) {
            case EventAuditory.All:
                return 'eventAuditoryAll'
            case EventAuditory.Employees:
                return 'eventAuditoryEmployees'
            case EventAuditory.Students:
                return 'eventAuditoryStudents'
            default:
                return 'eventAuditoryAll'
        }
    }

    const toggleDescription = () => {
        setIsDescriptionExpanded(!isDescriptionExpanded)
    }

    const handleStatusChange = async (status: EventStatus) => {
        try {
           const data = await editEventStatus(event.id, status)
           onEdit();
           showNotification(dispatch, intl.formatMessage({ id: 'success' }), NotificationTypeEnum.SUCCESS)
        } catch (error) {
            showNotification(dispatch, intl.formatMessage({ id: 'loadError' }), NotificationTypeEnum.ERROR)
        }
    }

    const handleDelete = async () => {
        try{
            const data = await deleteEvent(event.id)
            navigate('/admin/events')
            showNotification(dispatch, intl.formatMessage({ id: 'success' }), NotificationTypeEnum.SUCCESS)
        } catch  (error) {
            showNotification(dispatch, intl.formatMessage({ id: 'loadError' }), NotificationTypeEnum.ERROR)
        }
    }

    return (
        <div className={styles.eventInfo}>
            <div className={styles.titleSection}>
                <h2 className={styles.eventTitle}>{event.title}</h2>
                <div className={styles.actions}>
                    <EditEventStatusSelect
                        status={event.status}
                        onChange={handleStatusChange}
                    />
                    <div className={styles.actionIcons}>
                        <button className={styles.actionButton} onClick={() => {}}><EditIcon/></button>
                        <button className={styles.actionButton} onClick={handleDelete}><DeleteIcon/></button>
                     </div>
                </div>
            </div>

            <div className={styles.contentCard}>
                <div className={styles.cardContent}>
                    <div className={styles.descriptionSection}>
                        <div className={styles.descriptionHeader}>
                            <h4 className={styles.descriptionTitle}>
                                {intl.formatMessage({ id: 'eventDescription' })}
                            </h4>
                            <button
                                className={styles.toggleButton}
                                onClick={toggleDescription}
                                type="button"
                            >
                                {isDescriptionExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
                            </button>
                        </div>
                        {isDescriptionExpanded && event.description && (
                            <div
                                className={styles.descriptionContent}
                                dangerouslySetInnerHTML={{ __html: event.description }}
                            />
                        )}
                    </div>

                    <div className={styles.imageSection}>
                        {event.picture?.id ? (
                            <img
                                src={`${API_BASE_URL}/Files/${event.picture.id}`}
                                alt={event.title}
                                className={styles.eventImage}
                            />
                        ) : (
                            <div className={styles.eventImagePlaceholder}>
                                <span>{intl.formatMessage({ id: 'noImage' })}</span>
                            </div>
                        )}
                    </div>

                    <div className={styles.separator}></div>

                    {event.format == EventFormat.Offline && (
                        <>
                            <div className={styles.infoRow}>
                                <div className={styles.infoItem}>
                                    <span className={styles.infoLabel}>
                                        {intl.formatMessage({ id: "isRegistrationRequired" })}
                                    </span>
                                    <span className={styles.infoValue}>
                                        {intl.formatMessage({ id: getBooleanText(event.isRegistrationRequired) })}
                                    </span>
                                </div>
                                <div className={styles.infoItem}>
                                    <span className={styles.infoLabel}>
                                        {intl.formatMessage({ id: 'registrationDeadline' })}
                                    </span>
                                    <span className={styles.infoValue}>
                                        <FormattedDate value={event.registrationLastDate} year="numeric" month="2-digit" day="2-digit" />
                                    </span>
                                </div>
                            </div>
                            <div className={styles.separator}></div>
                        </>
                    )}

                    <div className={styles.addressRow}>
                        <div className={styles.addressBlockInfo}>
                            <div className={styles.infoRow}>
                                <div className={styles.infoItem}>
                                    <span className={styles.infoLabel}>
                                        {intl.formatMessage({ id: "eventType" })}
                                    </span>
                                    <span className={styles.infoValue}>
                                        {intl.formatMessage({ id: getEventTypeText(event.type) })}
                                    </span>
                                </div>
                                <div className={styles.infoItem}>
                                    <span className={styles.infoLabel}>
                                        {intl.formatMessage({ id: "targetAuditory" })}
                                    </span>
                                    <span className={styles.infoValue}>
                                        {intl.formatMessage({ id: getAudienceText(event.auditory) })}
                                    </span>
                                </div>
                            </div>

                            <div className={styles.separator}></div>

                            <div className={styles.infoRow}>
                                <div className={styles.infoItem}>
                                    <span className={styles.infoLabel}>
                                        {intl.formatMessage({ id: 'eventDates' })}
                                    </span>
                                    <span className={styles.infoValue}>
                                        {formatDate(
                                            event.dateTimeFrom,
                                            event.dateTimeTo,
                                            event.isTimeFromNeeded,
                                            event.isTimeToNeeded
                                        )}
                                    </span>
                                </div>
                                <div className={styles.infoItem}>
                                    <span className={styles.infoLabel}>
                                        {intl.formatMessage({ id: 'eventFormat' })}
                                    </span>
                                    <span className={styles.infoValue}>
                                        {intl.formatMessage({ id: getFormatText(event.format) })}
                                    </span>
                                </div>
                            </div>

                            <div className={styles.separator}></div>

                            {event.addressName && (
                                <>
                                    <div className={styles.infoRow}>
                                        <div className={styles.infoItem}>
                                            <span className={styles.infoLabel}>
                                                {intl.formatMessage({ id: "address" })}
                                            </span>
                                            <span className={styles.infoValue}>
                                                {event.addressName}
                                            </span>
                                        </div>
                                    </div>
                                    <div className={styles.separator}></div>
                                </>
                            )}

                            {event.link && (
                                <>
                                    <div className={styles.infoRow}>
                                        <div className={styles.infoItem}>
                                            <span className={styles.infoLabel}>
                                                {intl.formatMessage({ id: "eventLink" })}
                                            </span>
                                            <a href={event.link} target="_blank" rel="noopener noreferrer">
                                                {event.link}
                                            </a>
                                        </div>
                                    </div>
                                    <div className={styles.separator}></div>
                                </>
                            )}

                            {event.longitude && event.latitude && (
                                <>
                                    <div className={styles.infoRow}>
                                        <div className={styles.infoItem}>
                                            <span className={styles.infoLabel}>
                                                {intl.formatMessage({ id: "longitude" })}
                                            </span>
                                            <span className={styles.infoValue}>
                                                {event.longitude}
                                            </span>
                                        </div>
                                        <div className={styles.infoItem}>
                                            <span className={styles.infoLabel}>
                                                {intl.formatMessage({ id: "latitude" })}
                                            </span>
                                            <span className={styles.infoValue}>
                                                {event.latitude}
                                            </span>
                                        </div>
                                    </div>
                                    <div className={styles.separator}></div>
                                </>
                            )}
                        </div>

                        {event.latitude && event.longitude && (
                            <div className={styles.mapPreview}>
                                <InteractiveMap
                                    latitude={event.latitude}
                                    longitude={event.longitude}
                                    addressName={event.addressName}
                                    eventTitle={event.title}
                                />
                            </div>
                        )}
                    </div>

                    <div className={styles.infoRow}>
                        <div className={styles.infoItem}>
                            <span className={styles.infoLabel}>
                                {intl.formatMessage({ id: "isDigest" })}
                            </span>
                            <span className={styles.infoValue}>
                                {intl.formatMessage({ id: getBooleanText(event.isDigestNeeded) })}
                            </span>
                        </div>
                    </div>

                    <div className={styles.separator}></div>

                    {event.isDigestNeeded && (
                        <>
                            <div className={styles.infoRow}>
                                <div className={styles.infoItem}>
                                    <span className={styles.infoLabel}>
                                        {intl.formatMessage({ id: 'digestText' })}
                                    </span>
                                    <span className={styles.infoValue}>
                                        {event.digestText}
                                    </span>
                                </div>
                            </div>
                            <div className={styles.separator}></div>
                        </>
                    )}

                    <div className={styles.infoRow}>
                        <div className={styles.infoItem}>
                            <span className={styles.infoLabel}>
                                {intl.formatMessage({ id: 'eventCreator' })}
                            </span>
                            <span className={styles.infoValue}>
                                {event.author.lastName + " " + event.author.firstName + " " + event.author.patronymic}
                            </span>
                        </div>
                    </div>

                    {event.format == EventFormat.Online && (
                        <>
                            <div className={styles.separator}></div>
                            <div className={styles.infoRow}>
                                <div className={styles.infoItem}>
                                    <span className={styles.infoLabel}>
                                        {intl.formatMessage({ id: "isRegistrationRequired" })}
                                    </span>
                                    <span className={styles.infoValue}>
                                        {intl.formatMessage({ id: getBooleanText(event.isRegistrationRequired) })}
                                    </span>
                                </div>
                                <div className={styles.infoItem}>
                                    <span className={styles.infoLabel}>
                                        {intl.formatMessage({ id: 'registrationDeadline' })}
                                    </span>
                                    <span className={styles.infoValue}>
                                        <FormattedDate value={event.registrationLastDate} year="numeric" month="2-digit" day="2-digit" />
                                    </span>
                                </div>
                            </div>
                        </>
                    )}
                </div>
                <ParticipantList participants={event.participants}/>
            </div>
        </div>
    )
}