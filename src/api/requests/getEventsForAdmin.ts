import { AxiosResponse } from 'axios';
import { api } from '../instance';
import { EventsResponse } from '../../types/api/eventsTypes';
import { Filters } from '../../types/components/common/AdminEventsProps';

export const getEventsForAdmin = async (
  filters: Filters,
  page: number = 1,
  pageSize: number = 10
): Promise<AxiosResponse<EventsResponse>> => {
  const params: any = {
    page,
    pageSize,
    name: filters.name ?? undefined,
    status: filters.status ?? undefined,
    format: filters.format ?? undefined,
    eventType: filters.type ?? undefined,
    eventDate: filters.eventDate ?? undefined,
    timezoneOffset: filters.timezoneOffset ?? undefined,
  };
  Object.keys(params).forEach(key => params[key] === undefined && delete params[key]);
  return await api.get('/Events/', { params });
}; 