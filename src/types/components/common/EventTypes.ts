import { EventDto } from '../../api/eventsTypes';
import { Pagination } from '../../api/UsefulServicesResponse';

export interface EventCardProps {
  event: EventDto;
  onClick?: (event: EventDto) => void;
}

export interface EventsListProps {
  events: EventDto[];
  pagination?: Pagination;
  onEventClick?: (event: EventDto) => void;
  onPageChange?: (page: number) => void;
  isLoading?: boolean;
} 