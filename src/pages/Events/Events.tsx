import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Breadcrumbs } from "../../components/common/Breadcrumbs/Breadcrumbs";
import { useBreadcrumbs } from "../../hooks/useBreadcrumbs";
import { Container } from "../../components/UI/Container/Container";
import { EventsFilter } from "../../components/common/EventsFilter/EventsFilter";
import { EventsList } from "../../components/common/EventsList/EventsList";
import { EventDto, EventsResponse } from "../../types/api/eventsTypes";
import { Pagination } from "../../types/api/UsefulServicesResponse";
import { getEventsAuth } from "../../api/requests/getEventsAuth";
import { getEventsPublic } from "../../api/requests/getEventsPublic";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { showNotification } from "../../utils/notification";
import { NotificationTypeEnum } from "../../types/redux/NotificationTypeEnum";
import styles from "./Events.module.css";



export const Events = () => {
    const dispatch = useAppDispatch();
    const intl = useIntl();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const { accessToken } = useAppSelector((state) => state.user);
    const { setBreadcrumbItems } = useBreadcrumbs();
    
    const [events, setEvents] = useState<EventDto[]>([]);
    const [pagination, setPagination] = useState<Pagination | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    
    const getFiltersFromParams = () => ({
        name: searchParams.get('name') || '',
        eventDate: searchParams.get('date') || ''
    });
    const [filters, setFilters] = useState(getFiltersFromParams());

    useEffect(() => {
        setBreadcrumbItems([
          {
            id: "home",
            label: intl.formatMessage({id: 'main'}),
            path: "/events"
          },
          {
            id: "events",
            label: intl.formatMessage({id: '/events'}),
            path: "/events"
          }
        ]);
      }, [setBreadcrumbItems]);

    const fetchEvents = async (page: number = 1, urlFilters = filters) => {
      setIsLoading(true);
      try {
        const timezoneOffset = new Date().getTimezoneOffset();
        const pageSize = 10;
        let response;

        if (accessToken) {
          response = await getEventsAuth(urlFilters.name, urlFilters.eventDate, timezoneOffset, page, pageSize, '');
        } else {
          response = await getEventsPublic(urlFilters.name, urlFilters.eventDate, timezoneOffset, page, pageSize, '');
        }

        const eventsResponse: EventsResponse = response.data;
        setEvents(eventsResponse.results);
        setPagination(eventsResponse.metaData);
        setCurrentPage(page);
        
      } catch (error) {
        showNotification(dispatch, intl.formatMessage({ id: 'eventsLoadError' }), NotificationTypeEnum.ERROR, 5000);
      } finally {
        setIsLoading(false);
      }
    };

    const handleSearch = (searchFilters: { name: string; eventDate: string }) => {
      setFilters(searchFilters);
      setCurrentPage(1);
      const params: any = {};
      if (searchFilters.name) params.name = searchFilters.name;
      if (searchFilters.eventDate) params.date = searchFilters.eventDate;
      setSearchParams(params);
    };

    useEffect(() => {
      const urlFilters = getFiltersFromParams();
      setFilters(urlFilters);
      fetchEvents(1, urlFilters);
    }, [searchParams, accessToken]);

    const handleEventClick = (event: EventDto) => {
      navigate(`/events/${event.id}`);
    };

    const handlePageChange = (page: number) => {
      fetchEvents(page);
    };

  return (
    <Container>
        <div className={styles.content}>
        <Breadcrumbs/>
            <EventsFilter onSearch={handleSearch} isLoading={isLoading} filterValues={{ name: filters.name, date: filters.eventDate }} />
            <EventsList 
            events={events}
            pagination={pagination || undefined}
            onEventClick={handleEventClick}
            onPageChange={handlePageChange}
            isLoading={isLoading}
            />
        </div>
    </Container>
  );
};