import { FC } from 'react';
import { FormattedDate, useIntl } from 'react-intl';
import { EventDto, EventStatus, EventFormat, EventAuditory, EventType } from '../../../types/api/eventsTypes';
import { AdminEventCardProps } from '../../../types/components/common/AdminEventsProps';
import EditIcon from '../../../assets/icons/Edit/black/Edit_Pencil_Line_01.svg?react';
import DeleteIcon from '../../../assets/icons/Edit/black/Trash_Full.svg?react';
import { API_BASE_URL } from '../../../api/instance';
import styles from './AdminEventCard.module.css';
import { Badge } from '../../UI/Badge/Badge';
import dayjs from 'dayjs';
import { deleteEvent } from '../../../api/requests/deleteEvent';
import { showNotification } from '../../../utils/notification';
import { useAppDispatch } from '../../../store/hooks';
import { NotificationTypeEnum } from '../../../types/redux/NotificationTypeEnum';

export const AdminEventCard: FC<AdminEventCardProps> = ({ 
  event, 
  onClick, 
  onEdit, 
  onDelete, 
}) => {
  const intl = useIntl();
  const dispatch = useAppDispatch();


  const formatTimeOnly = (dateString: string) => {
    return dayjs(dateString).format('HH:mm');
  };


  const getFormatText = (format: EventFormat) => {
    return format === EventFormat.Online 
      ? intl.formatMessage({ id: 'eventFormatOnline' })
      : intl.formatMessage({ id: 'eventFormatOffline' });
  };

  const getStatusText = (status: EventStatus) => {
    switch (status) {
      case EventStatus.Draft:
        return intl.formatMessage({ id: 'eventStatusDraft' });
      case EventStatus.Actual:
        return intl.formatMessage({ id: 'eventStatusActual' });
      case EventStatus.Finished:
        return intl.formatMessage({ id: 'eventStatusFinished' });
      case EventStatus.Archive:
        return intl.formatMessage({ id: 'eventStatusArchive' });
      default:
        return status;
    }
  };

  const getStatusClass = (status: EventStatus) => {
    switch (status) {
      case EventStatus.Draft:
        return "default";
      case EventStatus.Actual:
        return "success-light";
      case EventStatus.Finished:
        return "success";
      case EventStatus.Archive:
        return "black";
      default:
        return 'default';
    }
  };

  const getEventTypeText = (type: EventType) => {
    switch (type) {
      case EventType.Open:
        return intl.formatMessage({id: 'eventTypeOpen'})
      case EventType.Close:
        return intl.formatMessage({id: 'eventTypeClose'})
      default:
        return intl.formatMessage({id: 'eventTypeClose'})
    }
  }

  const handleClick = () => {
    if (onClick) {
      onClick(event);
    }
  };


  const handleDelete = async () => {
    try {
      const data = await deleteEvent(event.id);
      showNotification(dispatch, "Мероприятие успешно удалено", NotificationTypeEnum.SUCCESS)
    } catch (error) {
      showNotification(dispatch, "Ошибка при удалении мероприятия", NotificationTypeEnum.ERROR)
    }
    if (onDelete) {
      onDelete();
    }
  };


  return (
    <div className={styles.adminEventCard} onClick={handleClick}>
      <div className={styles.stateLayer}>
        <div className={styles.imageContainer}> 
          {event.picture?.id ? (
            <img 
              src={`${API_BASE_URL}/Files/${event.picture.id}`} 
              alt={event.title}
              className={styles.eventImage}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.nextElementSibling?.setAttribute('style', 'display: flex');
              }}
            />
          ) : (
            <div className={styles.eventImagePlaceholder}>
              <span>{intl.formatMessage({ id: 'noImage' })}</span>
            </div>
          )}
        </div>
        <div className={styles.contentWrapper}>
          <div className={styles.headerRow}>
            <h3 className={styles.eventTitle}>{event.title}</h3>
            <div className={styles.actions}>
            <button className={styles.actionButton} onClick={(e) => { e.stopPropagation();}}><EditIcon/></button>
            <button className={styles.actionButton} onClick={(e) =>{e.stopPropagation(); handleDelete()}}><DeleteIcon/></button>
            </div>
          </div>
          <Badge
            variant={getStatusClass(event.status)}>
              {getStatusText(event.status)}
            </Badge>
          <div className={styles.metaGrid}>
            <div className={styles.metaRow}>
              <div className={styles.metaCol}>
                <p className={styles.metaLabel}>{intl.formatMessage({ id: 'eventTypeLabel' })}</p>
                <p className={styles.metaValue}>{getEventTypeText(event.type)}</p>
              </div>
              {event.auditory != EventAuditory.All && (
                <div className={styles.metaCol}>
                  <p className={styles.metaLabel}>{intl.formatMessage({ id: 'eventAudienceLabel' })}</p>
                  <p className={styles.metaValue}>{event.auditory}</p>
                </div>
              )}
            </div>
            <div className={styles.metaRow}>
              <div className={styles.metaCol}>
                <p className={styles.metaLabel}>{intl.formatMessage({ id: 'eventDatesLabel' })}</p>
                <p className={styles.metaValue}>
                  <FormattedDate value={event.dateTimeFrom} year="numeric" month="2-digit" day="2-digit" />
                  {' - '}
                  <FormattedDate value={event.dateTimeTo} year="numeric" month="2-digit" day="2-digit" />
                </p>
              </div>
              <div className={styles.metaCol}>
                <p className={styles.metaLabel}>{intl.formatMessage({ id: 'eventFormatLabel' })}</p>
                <p className={styles.metaValue}>{getFormatText(event.format)}</p>
              </div>
            </div>
            <div className={styles.metaRow}>
              {event.isTimeFromNeeded && (
                  <div className={styles.metaCol}>
                    <p className={styles.metaLabel}>{intl.formatMessage({ id: 'eventTimeFromLabel' })}</p>
                    <p className={styles.metaValue}>{formatTimeOnly(event.dateTimeFrom)}</p>
                </div>
              )}
              {event.isTimeToNeeded && (
                  <div className={styles.metaCol}>
                    <p className={styles.metaLabel}>{intl.formatMessage({ id: 'eventTimeToLabel' })}</p>
                    <p className={styles.metaValue}>{formatTimeOnly(event.dateTimeTo)}</p>
                </div>
              )}
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}; 