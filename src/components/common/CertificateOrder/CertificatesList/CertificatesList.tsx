import { FormattedMessage } from 'react-intl';
import { Badge } from '../../../UI/Badge/Badge';
import { FilterChip } from '../../../UI/FilterChip/FilterChip';
import { Spinner } from '../../../UI/Spinner/Spinner';
import DownloadIconBlue from '../../../../assets/icons/Interface/black/download.svg?react';
import DownloadIconWhite from '../../../../assets/icons/File/black/Download_Package.svg?react';
import { CertificateDto, CertificateStatus } from '../../../../types/api/certificateTypes';
import { UserType } from '../../../../types/api/profileResponse';
import { getStatusText, getStatusVariant, getTypeText, getReceiveTypeText } from '../../../../utils/certificateUtils';
import styles from './CertificatesList.module.css';

interface CertificatesListProps {
  certificates: CertificateDto[];
  userType: UserType | null;
  isLoading: boolean;
  onDownload: (certificateId: string, fileType: 'certificate' | 'signature') => Promise<void>;
}

export const CertificatesList = ({ 
  certificates, 
  userType, 
  isLoading, 
  onDownload 
}: CertificatesListProps) => {
  if (isLoading) {
    return (
      <div className={styles.certificatesList}>
        <div className={styles.loadingContainer}>
          <Spinner />
        </div>
      </div>
    );
  }

  if (certificates.length === 0) {
    return (
      <div className={styles.certificatesList}>
        <div className={styles.emptyState}>
          <p><FormattedMessage id="noCertificatesYet" /></p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.certificatesList}>
      {certificates.map((certificate) => (
        <div key={certificate.id} className={styles.certificateItem}>
          <div className={styles.certificateContent}>
            <div className={styles.certificateTitle}>
              <FormattedMessage id="certificateFrom" /> {new Date(certificate.dateOfForming).toLocaleString('ru-RU')}
            </div>
            <div className={styles.certificateInfo}>
              <p className={styles.certificateDate}>
                <FormattedMessage id="certificateTypeLabel" /> - <FormattedMessage id={getTypeText(userType === UserType.Student ? certificate.type : certificate.staffType)} />
              </p>
              <p className={styles.certificateDate}>
                <FormattedMessage id="certificateKindLabel" /> - <FormattedMessage id={getReceiveTypeText(certificate.receiveType)} />
              </p>
            </div>
          </div>
          <div className={styles.certificateActions}>
            <div className={styles.certificateActionsButtons}>
              {certificate.status === CertificateStatus.Finished && certificate.certificateFile && (
                <>
                  <FilterChip className={styles.filterChip} leftIcon={<DownloadIconBlue/>} onClick={() => onDownload(certificate.id, 'certificate')}>
                    downloadCertificate
                  </FilterChip>
                  {certificate.signatureFile && (
                    <FilterChip className={styles.filterChip} leftIcon={<DownloadIconWhite/>} variant='primary' onClick={() => onDownload(certificate.id, 'signature')}>
                      downloadSignature
                    </FilterChip>
                  )}
                </>
              )}
            </div>
            <Badge className={styles.statusBadge} variant={getStatusVariant(certificate.status)}>
              <FormattedMessage id={getStatusText(certificate.status)} />
            </Badge>
          </div>
        </div>
      ))}
    </div>
  );
}; 