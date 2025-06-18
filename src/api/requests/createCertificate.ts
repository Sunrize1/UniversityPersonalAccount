import { AxiosResponse } from 'axios';
import { CreateCertificateRequest, CertificateDto } from '../../types/api/certificateTypes';
import { api } from '../instance';

export const createCertificate = async (
  data: CreateCertificateRequest
): Promise<AxiosResponse<CertificateDto>> => {
  return await api.post('/Certificates', data);
}; 