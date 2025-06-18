import { AxiosResponse } from 'axios';
import { CertificateDto } from '../../types/api/certificateTypes';
import { api } from '../instance';
import { UserType } from '../../types/api/profileResponse';

export const getCertificates = async (
  userType: UserType,
  ownerId: string
): Promise<AxiosResponse<CertificateDto[]>> => {
  return await api.get(`/Certificates/userType/${userType}/entity/${ownerId}`);
}; 