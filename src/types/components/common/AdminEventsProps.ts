import { EventType } from '../../api/eventsTypes';
import { EventDto, EventFormat, EventStatus } from '../../api/eventsTypes';
import { Pagination } from '../../api/UsefulServicesResponse';

export interface AdminEventCardProps {
  event: EventDto;
  onClick?: (event: EventDto) => void;
  onEdit?: (event: EventDto) => void;
  onDelete?: () => void;
}

export interface AdminEventsListProps {
  events: EventDto[];
  pagination?: Pagination;
  onEventClick?: (event: EventDto) => void;
  onEventEdit?: (event: EventDto) => void;
  onEventDelete?: () => void;
  onEventStatusChange?: (event: EventDto, newStatus: EventStatus) => void;
  onPageChange?: (page: number) => void;
  isLoading?: boolean;
}

export interface AdminEventsFilterForm {
  name: string | null;
  status: EventStatus | null;
  format: EventFormat | null;
  type: EventType | null;
  eventDate: string | null;
  timezoneOffset: number | null;
}

export interface AdminEventsFilterProps {
  onSearch: (filters: Filters) => void;
  isLoading?: boolean;
  filterValues?: Filters;
}

export type Filters = {
  name: string | null;
  status: EventStatus | null;
  format: EventFormat | null;
  type: EventType | null;
  eventDate: string | null;
  timezoneOffset: number | null;
}