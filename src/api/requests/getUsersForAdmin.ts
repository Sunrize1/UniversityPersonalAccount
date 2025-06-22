import { AxiosResponse } from 'axios';
import { api } from '../instance';
import { AdminUsersResponse } from '../../types/api/AdminUsersResponse';

export const getUsersForAdmin = async (
  email: string,
  name: string,
  filterLastName: string,
  page: number,
  pageSize: number,
): Promise<AxiosResponse<AdminUsersResponse>> => {
  return await api.get(`/User/list?page=${page}&pageSize=${pageSize}&email=${email}&name=${name}&filterLastName=${filterLastName}`);
}; 