import { FC, ReactNode } from 'react';
import { FormattedDate, useIntl } from 'react-intl';
import { EventCardProps } from '../../../types/components/common/EventTypes';
import { EventFormat } from '../../../types/api/eventsTypes';
import styles from './EventCard.module.css';
import { API_BASE_URL } from '../../../api/instance';
import dayjs from 'dayjs';

export const EventCard: FC<EventCardProps> = ({ event, onClick }) => {
  const intl = useIntl();

  const formatDate = (
    dateTimeFrom: string,
    dateTimeTo: string,
    isTimeFromNeeded: boolean,
    isTimeToNeeded: boolean
  ): ReactNode => {
    const from = dayjs(dateTimeFrom);
    const to = dayjs(dateTimeTo);
    const isSameDay = from.isSame(to, 'day');
    if (isSameDay) {
      return <>
        <FormattedDate value={dateTimeFrom} year="numeric" month="2-digit" day="2-digit" />
        {isTimeFromNeeded && isTimeToNeeded && (
          <> ({from.format('HH:mm')} - {to.format('HH:mm')})</>
        )}
        {isTimeFromNeeded && !isTimeToNeeded && (
          <> ({from.format('HH:mm')})</>
        )}
      </>;
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
      </>;
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
