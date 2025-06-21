import { FC } from 'react';
import { useIntl } from 'react-intl';
import { EventsListProps } from '../../../types/components/common/EventTypes';
import { EventCard } from '../EventCard/EventCard';
import { Pagination } from '../../UI/Pagination/Pagination';
import { Spinner } from '../../UI/Spinner/Spinner';
import styles from './EventsList.module.css';

export const EventsList: FC<EventsListProps> = ({ 
  events, 
  pagination, 
  onEventClick, 
  onPageChange,
  isLoading = false 
}) => {
  const intl = useIntl();

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <Spinner />
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.emptyState}>
          <h3 className={styles.emptyStateTitle}>
            {intl.formatMessage({ id: 'noEventsFound' })}
          </h3>
          <p className={styles.emptyStateText}>
            {intl.formatMessage({ id: 'noEventsFoundText' })}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.eventsList}>
        {events.map((event) => (
          <EventCard 
            key={event.id} 
            event={event} 
            onClick={onEventClick}
          />
        ))}
      </div>
      
      {pagination && onPageChange && (
        <Pagination 
          pagination={pagination}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};
