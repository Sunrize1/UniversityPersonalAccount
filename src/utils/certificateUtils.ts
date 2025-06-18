import { 
  CertificateStatus, 
  CertificateType, 
  CertificateStaffType, 
  CertificateReceiveType 
} from '../types/api/certificateTypes';

export const getStatusText = (status: CertificateStatus): string => {
  if (!status) return 'certificateStatusCreated';
  
  switch (status) {
    case CertificateStatus.Created:
      return 'certificateStatusCreated';
    case CertificateStatus.InProcess:
      return 'certificateStatusInProcess';
    case CertificateStatus.Finished:
      return 'certificateStatusFinished';
    default:
      return 'certificateStatusCreated';
  }
};

export const getStatusVariant = (status: CertificateStatus): 'default' | 'warning' | 'success' => {
  switch (status) {
    case CertificateStatus.Created:
      return 'default';
    case CertificateStatus.InProcess:
      return 'warning';
    case CertificateStatus.Finished:
      return 'success';
    default:
      return 'default';
  }
};

export const getTypeText = (type: CertificateType | CertificateStaffType): string => {
  if (!type) return 'certificateTypeForPlaceWhereNeeded';
  
  switch (type) {
    case CertificateType.ForPlaceWhereNeeded:
      return 'certificateTypeForPlaceWhereNeeded';
    case CertificateType.PensionForKazakhstan:
      return 'certificateTypePensionForKazakhstan';
    case CertificateStaffType.ForPlaceOfWork:
      return 'certificateTypeForPlaceOfWork';
    case CertificateStaffType.ForExperience:
      return 'certificateTypeForExperience';
    case CertificateStaffType.ForVisa:
      return 'certificateTypeForVisa';
    case CertificateStaffType.ForWorkBookCopy:
      return 'certificateTypeForWorkBookCopy';
    default:
      return 'certificateTypeForPlaceWhereNeeded';
  }
};

export const getReceiveTypeText = (receiveType: CertificateReceiveType): string => {
  if (!receiveType) return 'receiveTypeElectronic';
  
  switch (receiveType) {
    case CertificateReceiveType.Electronic:
      return 'receiveTypeElectronic';
    case CertificateReceiveType.Paper:
      return 'receiveTypePaper';
    default:
      return 'receiveTypeElectronic';
  }
}; 