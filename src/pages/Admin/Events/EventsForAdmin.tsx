import { FC, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { Container } from '../../../components/UI/Container/Container';
import { AdminEventsFilter } from '../../../components/common/AdminEventsFilter/AdminEventsFilter';
import { AdminEventsList } from '../../../components/common/AdminEventsList/AdminEventsList';
import { EventDto, EventFormat, EventsResponse, EventStatus, EventType } from '../../../types/api/eventsTypes';
import { Breadcrumbs } from '../../../components/common/Breadcrumbs/Breadcrumbs';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setBreadcrumbs } from '../../../store/breadcrumbsSlice/breadcrumbsSlice';
import { showNotification } from '../../../utils/notification';
import { NotificationTypeEnum } from '../../../types/redux/NotificationTypeEnum';
import styles from './EventsForAdmin.module.css';
import { Filters } from '../../../types/components/common/AdminEventsProps';
import { getEventsForAdmin } from '../../../api/requests/getEventsForAdmin';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const EventsForAdmin: FC = () => {
  const intl = useIntl();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const accessToken = useAppSelector(state => state.user.accessToken);

  const [events, setEvents] = useState<EventDto[]>([]);
  const [pagination, setPagination] = useState<EventsResponse['metaData'] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const getFiltersFromParams = (): Filters => ({
    name: searchParams.get('name') || null,
    status: searchParams.get('status') ? (searchParams.get('status') as EventStatus) : null,
    format: searchParams.get('format') ? (searchParams.get('format') as EventFormat) : null,
    type: searchParams.get('type') ? (searchParams.get('type') as EventType) : null,
    eventDate: searchParams.get('eventDate') || null,
    timezoneOffset: searchParams.get('timezoneOffset') ? Number(searchParams.get('timezoneOffset')) : null,
  });
  const [filters, setFilters] = useState<Filters>(getFiltersFromParams());

  useEffect(() => {
    dispatch(setBreadcrumbs([
    { id: '1', label: intl.formatMessage({id: 'main'}), path: '/events' },
      { id: '2', label: intl.formatMessage({id: '/admin'}), path: '/admin' },
      { id: '3', label: intl.formatMessage({id: '/events'}), path: '/admin/events' }
    ]));
  }, [dispatch]);

  const fetchEvents = async (page: number = 1, urlFilters = filters) => {
    setIsLoading(true);
    try {
      const response = await getEventsForAdmin(urlFilters, page, 10);
      setEvents(response.data.results);
      setPagination(response.data.metaData);
      setCurrentPage(page);
    } catch (error) {
      showNotification(dispatch, intl.formatMessage({ id: 'eventsLoadError' }), NotificationTypeEnum.ERROR, 5000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (searchFilters: Filters) => {
    setFilters(searchFilters);
    setCurrentPage(1);
    const params: any = {};
    if (searchFilters.name) params.name = searchFilters.name;
    if (searchFilters.status) params.status = searchFilters.status;
    if (searchFilters.format) params.format = searchFilters.format;
    if (searchFilters.type) params.type = searchFilters.type;
    if (searchFilters.eventDate) params.eventDate = searchFilters.eventDate;
    if (searchFilters.timezoneOffset !== null && searchFilters.timezoneOffset !== undefined) params.timezoneOffset = searchFilters.timezoneOffset;
    setSearchParams(params);
  };

  useEffect(() => {
    const urlFilters = getFiltersFromParams();
    setFilters(urlFilters);
    fetchEvents(currentPage, urlFilters);
  }, [searchParams]);

  const handleEventClick = (event: EventDto) => {
    navigate(`/admin/events/${event.id}`)
  };

  const handleEventEdit = (event: EventDto) => {
    // TODO: Навигация к редактированию события
    console.log('Edit event:', event);
  };

  const handleEventDelete = () => {
   fetchEvents()
  };

  const handleEventStatusChange = (event: EventDto, newStatus: EventStatus) => {
    // TODO: API запрос для изменения статуса
    console.log('Change status:', event.id, newStatus);
  };

  const handlePageChange = (page: number) => {
    fetchEvents(page);
  };


  return (
    <Container>
      <div className={styles.content}>
        <Breadcrumbs />
        <AdminEventsFilter onSearch={handleSearch} isLoading={isLoading} filterValues={filters} />
        <AdminEventsList 
          events={events}
          pagination={pagination || undefined}
          onEventClick={handleEventClick}
          onEventEdit={handleEventEdit}
          onEventDelete={handleEventDelete}
          onEventStatusChange={handleEventStatusChange}
          onPageChange={handlePageChange}
          isLoading={isLoading}
        />
      </div>
    </Container>
  );
};
