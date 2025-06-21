import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
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
    const { accessToken } = useAppSelector((state) => state.user);
    const { setBreadcrumbItems } = useBreadcrumbs();
    
    const [events, setEvents] = useState<EventDto[]>([]);
    const [pagination, setPagination] = useState<Pagination | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState({
        name: '',
        eventDate: ''
    });

    useEffect(() => {
        setBreadcrumbItems([
          {
            id: "home",
            label: "main",
            path: "/"
          },
          {
            id: "events",
            label: "events",
            path: "/events"
          }
        ]);
      }, [setBreadcrumbItems]);

    const fetchEvents = async (page: number = 1) => {
      setIsLoading(true);
      try {
        const timezoneOffset = new Date().getTimezoneOffset();
        const pageSize = 10;
        let response;

        if (accessToken) {
          response = await getEventsAuth(filters.name, filters.eventDate, timezoneOffset, page, pageSize, '');
        } else {
          response = await getEventsPublic(filters.name, filters.eventDate, timezoneOffset, page, pageSize, '');
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
      fetchEventsWithFilters(1, searchFilters);
    };

    const fetchEventsWithFilters = async (page: number, searchFilters: { name: string; eventDate: string }) => {
      setIsLoading(true);
      try {
        const timezoneOffset = new Date().getTimezoneOffset();
        const pageSize = 10;
        let response;

        if (accessToken) {
          response = await getEventsAuth(searchFilters.name, searchFilters.eventDate, timezoneOffset, page, pageSize, '');
        } else {
          response = await getEventsPublic(searchFilters.name, searchFilters.eventDate, timezoneOffset, page, pageSize, '');
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

    useEffect(() => {
      fetchEvents();
    }, [accessToken]);

    const handleEventClick = (event: EventDto) => {
    };

    const handlePageChange = (page: number) => {
      fetchEvents(page);
    };

  return (
    <Container>
        <Breadcrumbs/>
        <div className={styles.content}>
            <EventsFilter onSearch={handleSearch} isLoading={isLoading} />
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