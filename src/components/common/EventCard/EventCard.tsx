import { FC } from 'react';
import { useIntl } from 'react-intl';
import { EventCardProps } from '../../../types/components/common/EventTypes';
import { EventFormat } from '../../../types/api/eventsTypes';
import styles from './EventCard.module.css';
import { API_BASE_URL } from '../../../api/instance';

export const EventCard: FC<EventCardProps> = ({ event, onClick }) => {
  const intl = useIntl();

  const formatDate = (dateTimeFrom: string, dateTimeTo: string, isTimeFromNeeded: boolean, isTimeToNeeded: boolean) => {
    const fromDate = new Date(dateTimeFrom);
    const toDate = new Date(dateTimeTo);
    
    const formatTime = (date: Date) => 
      date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    
    const formatDateOnly = (date: Date) => 
      date.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' });

    const isSameDay = fromDate.toDateString() === toDate.toDateString();

    if (isSameDay) {
      const dateStr = formatDateOnly(fromDate);
      if (isTimeFromNeeded && isTimeToNeeded) {
        return `${dateStr} (${formatTime(fromDate)} - ${formatTime(toDate)})`;
      } else if (isTimeFromNeeded) {
        return `${dateStr} (${formatTime(fromDate)})`;
      } else {
        return dateStr;
      }
    } else {
      const fromStr = `${formatDateOnly(fromDate)}${isTimeFromNeeded ? ` (${formatTime(fromDate)})` : ''}`;
      const toStr = `${formatDateOnly(toDate)}${isTimeToNeeded ? ` (${formatTime(toDate)})` : ''}`;
      return `${fromStr} - ${toStr}`;
    }
  };

  const getFormatText = (format: EventFormat) => {
    return format === EventFormat.Online 
      ? intl.formatMessage({ id: 'eventFormatOnline' })
      : intl.formatMessage({ id: 'eventFormatOffline' });
  };

  const handleClick = () => {
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <div className={styles.eventCard} onClick={handleClick}>
      <div className={styles.stateLayer}>
        <div className={styles.content}>
          <div className={styles.eventInfo}>
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
            <div className={styles.eventDetails}>
              <div className={styles.titleContainer}>
                <h3 className={styles.eventTitle}>{event.title}</h3>
              </div>
              <div className={styles.eventMeta}>
                <div className={styles.dateInfo}>
                  <span className={styles.metaLabel}>
                    {intl.formatMessage({ id: 'eventDates' })}
                  </span>
                  <span className={styles.metaValue}>
                    {formatDate(
                      event.dateTimeFrom, 
                      event.dateTimeTo, 
                      event.isTimeFromNeeded, 
                      event.isTimeToNeeded
                    )}
                  </span>
                </div>
                <div className={styles.formatInfo}>
                  <span className={styles.metaLabel}>
                    {intl.formatMessage({ id: 'eventFormat' })}
                  </span>
                  <span className={styles.metaValue}>
                    {getFormatText(event.format)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
