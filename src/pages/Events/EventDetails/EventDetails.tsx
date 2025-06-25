import { FC, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { EventFullDto } from '../../../types/api/eventsTypes';
import { getEventDetails } from '../../../api/requests/getEventDetails';
import { isUserParticipating } from '../../../api/requests/isUserParticipating';
import { EventInfo } from '../../../components/common/EventInfo/EventInfo';
import { Container } from '../../../components/UI/Container/Container';
import { Spinner } from '../../../components/UI/Spinner/Spinner';
import { Breadcrumbs } from '../../../components/common/Breadcrumbs/Breadcrumbs';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { setBreadcrumbs } from '../../../store/breadcrumbsSlice/breadcrumbsSlice';
import styles from './EventDetails.module.css';

export const EventDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const intl = useIntl();
  const dispatch = useAppDispatch();
  
  const [event, setEvent] = useState<EventFullDto | null>(null);
  const [isParticipating, setIsParticipating] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isAuthenticated = useAppSelector(state => !!state.user.accessToken);

  useEffect(() => {
    if (!id) {
      navigate('/events');
      return;
    }

    const fetchEventDetails = async () => {
      try {
        setLoading(true);
        const eventResponse = await getEventDetails(id);
        setEvent(eventResponse.data);

        dispatch(setBreadcrumbs([
          { id: '1', label: intl.formatMessage({id: 'main'}), path: '/events' },
          { id: '2', label: eventResponse.data.title, path: `/events/${id}` }
        ]));

        if (isAuthenticated) {
          try {
            const participationResponse = await isUserParticipating(id);
            setIsParticipating(participationResponse.data.isParticipating);
          } catch (participationError) {
          }
        }
      } catch (err) {
        setError('Ошибка загрузки мероприятия');
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [id, navigate, dispatch, isAuthenticated]);

  if (loading) {
    return (
      <Container>
        <div className={styles.spinnerContainer}>
          <Spinner />
        </div>
      </Container>
    );
  }

  if (error || !event) {
    return (
      <Container>
        <div className={styles.errorContainer}>
          <h2>{intl.formatMessage({ id: 'error' })}</h2>
          <p>{error ? intl.formatMessage({ id: 'errorLoadingEvent' }) : intl.formatMessage({ id: 'eventNotFound' })}</p>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className={styles.eventDetailsPage}>
        <Breadcrumbs />
        
        <div className={styles.content}>
          <EventInfo 
            event={event} 
            isParticipating={isParticipating}
            onParticipationChange={setIsParticipating}
          />
        </div>
      </div>
    </Container>
  );
};
