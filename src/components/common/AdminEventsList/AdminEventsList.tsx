import { FC } from 'react';
import { useIntl } from 'react-intl';
import { EventDto, EventStatus } from '../../../types/api/eventsTypes';
import { Pagination } from '../../../types/api/UsefulServicesResponse';
import { AdminEventsListProps } from '../../../types/components/common/AdminEventsProps';
import { AdminEventCard } from '../AdminEventCard/AdminEventCard';
import { Pagination as PaginationComponent } from '../../UI/Pagination/Pagination';
import { Spinner } from '../../UI/Spinner/Spinner';
import styles from './AdminEventsList.module.css';

export const AdminEventsList: FC<AdminEventsListProps> = ({ 
  events, 
  pagination, 
  onEventClick, 
  onEventEdit,
  onEventDelete,
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
          <AdminEventCard 
            key={event.id} 
            event={event} 
            onClick={onEventClick}
            onEdit={onEventEdit}
            onDelete={onEventDelete}
          />
        ))}
      </div>
      
      {pagination && onPageChange && (
        <PaginationComponent 
          pagination={pagination}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
}; 