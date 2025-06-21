import { AxiosResponse } from 'axios';
import { api } from '../instance';
import { EventsResponse } from '../../types/api/eventsTypes';

export const getEventsAuth = async (
  name: string,
  eventDate: string,
  timezoneOffset: number,
  page: number,
  pageSize: number,
  filter: string
): Promise<AxiosResponse<EventsResponse>> => {
  return await api.get(`/Events/public/auth?page=${page}&pageSize=${pageSize}&filter=${filter}&name=${name}&eventDate=${eventDate}&timezoneOffset=${timezoneOffset}`);
}; 