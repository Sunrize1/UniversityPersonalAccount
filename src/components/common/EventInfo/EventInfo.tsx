import { FC, useState } from 'react';
import { useIntl } from 'react-intl';
import { EventFullDto, EventFormat } from '../../../types/api/eventsTypes';
import { Button } from '../../UI/Button/Button';
import { API_BASE_URL } from '../../../api/instance';
import styles from './EventInfo.module.css';
import { InteractiveMap } from '../EventMap/InteractiveMap';
import ChevronDownIcon from '../../../assets/icons/Arrow/black/Caret_Down_MD.svg?react';
import ChevronUpIcon from '../../../assets/icons/Arrow/black/Caret_Up_MD.svg?react';
import { showNotification } from '../../../utils/notification';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { NotificationTypeEnum } from '../../../types/redux/NotificationTypeEnum';
import { innerEventRegister } from '../../../api/requests/innerEventRegister';
import { EventRegistrationModal } from '../EventRegistrationModal/EventRegistrationModal';

interface EventInfoProps {
  event: EventFullDto;
  isParticipating?: boolean;
  onParticipationChange?: (isParticipating: boolean) => void;
}

export const EventInfo: FC<EventInfoProps> = ({
  event,
  isParticipating = false,
  onParticipationChange
}) => {
  const dispatch = useAppDispatch();
  const intl = useIntl();
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isAuthenticated = useAppSelector(state => !!state.user.accessToken);

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

  const handleParticipationClick = async () => {
    if (!event.isRegistrationRequired) return;

    if (isAuthenticated) {
      try {
        if (!isParticipating) {
          await innerEventRegister({
            eventId: event.id
          });
          showNotification(dispatch, 'Регистрация успешна', NotificationTypeEnum.SUCCESS, 5000);
          onParticipationChange?.(true);
        }
      } catch (error) {
        showNotification(dispatch, 'Ошибка регистрации', NotificationTypeEnum.ERROR, 5000);
      }
    } else {
      setIsModalOpen(true);
    }
  };

  const handleModalSuccess = () => {
    onParticipationChange?.(true);
  };

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  return (
    <div className={styles.eventInfo}>
      <div className={styles.titleSection}>
        <h2 className={styles.eventTitle}>{event.title}</h2>
        {event.isRegistrationRequired && (
          <Button 
            variant={isParticipating ? "outline" : "primary"}
            onClick={handleParticipationClick}
            className={styles.participateButton}
            disabled={isParticipating}
          >
            {isParticipating ? 'cancelParticipation' : 'participate'}
          </Button>
        )}
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

          {event.isRegistrationRequired && event.registrationLastDate && (
            <>
              <div className={styles.infoRow}>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>
                    {intl.formatMessage({ id: 'registrationDeadline' })}
                  </span>
                  <span className={styles.infoValue}>
                    {new Date(event.registrationLastDate).toLocaleDateString('ru-RU')}
                  </span>
                </div>
              </div>
              <div className={styles.separator}></div>
            </>
          )}

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
                {getFormatText(event.format)}
              </span>
            </div>
          </div>

          <div className={styles.separator}></div>

          {event.addressName && (
            <div className={styles.addressRow}>
              <div className={styles.addressInfo}>
                <span className={styles.infoLabel}>
                  {intl.formatMessage({ id: 'eventLocation' })}
                </span>
                <span className={styles.infoValue}>
                  {event.addressName}
                </span>
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
          )}

          {event.link && (
            <div className={styles.infoRow}>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>
                {intl.formatMessage({ id: 'eventLink' })}
              </span>
              <span className={styles.infoValue}>
                <a href={event.link} target="_blank" rel="noopener noreferrer">
                  {event.link}
                </a>
              </span>
            </div>

          </div>
          )}
        </div>
      </div>

      <EventRegistrationModal
        eventId={event.id}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleModalSuccess}
      />
    </div>
  );
};
