import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import styles from './CertificateOrderInfo.module.css';
import { useAppDispatch } from '../../../store/hooks';
import { UserType } from '../../../types/api/profileResponse';
import { showNotification } from '../../../utils/notification';
import { NotificationTypeEnum } from '../../../types/redux/NotificationTypeEnum';
import { getCertificates } from '../../../api/requests/getCertificates';
import { createCertificate } from '../../../api/requests/createCertificate';
import { downloadFile } from '../../../api/requests/downloadFile';
import { 
  CertificateDto, 
  CertificateType, 
  CertificateStaffType, 
  CertificateReceiveType,
  CertificateStatus
} from '../../../types/api/certificateTypes';
import { CertificateOrderProps, CertificateOrderFormData, TabInfoData } from '../../../types/components/common/CertificateOrderTypes';
import { CertificateOrderForm } from './CertificateOrderForm/CertificateOrderForm';
import { CertificatesList } from './CertificatesList/CertificatesList';

export const CertificateOrderInfo = ({ userType, studentData, employeeData, tabsData, onClose }: CertificateOrderProps) => {
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState<string>(tabsData[0]?.id || '');
  const [certificates, setCertificates] = useState<CertificateDto[]>([]);
  const [isLoadingCertificates, setIsLoadingCertificates] = useState(false);
  const [isCreatingCertificate, setIsCreatingCertificate] = useState(false);

  useEffect(() => {
    if (tabsData.length > 0 && !tabsData.find(tab => tab.id === activeTab)) {
      setActiveTab(tabsData[0].id);
    }
  }, [tabsData, activeTab]);

  const ownerId = activeTab;

  const loadCertificates = async () => {
    if (!ownerId || !userType) return;
    
    setIsLoadingCertificates(true);
    try {
      const response = await getCertificates(userType, ownerId);
      setCertificates(response.data);
    } catch (error) {
      showNotification(dispatch, 'Ошибка загрузки справок', NotificationTypeEnum.ERROR, 5000);
    } finally {
      setIsLoadingCertificates(false);
    }
  };

  useEffect(() => {
    loadCertificates();
  }, [userType, ownerId]);

  const handleOrder = async (data: CertificateOrderFormData) => {
    if (!ownerId || !activeTab || !userType) {
      showNotification(dispatch, 'Ошибка: не выбрана запись для справки', NotificationTypeEnum.ERROR, 5000);
      return;
    }

    setIsCreatingCertificate(true);
    try {
      const requestData = {
        ...(userType === UserType.Student 
          ? { 
              type: data.certificateType as CertificateType,
              staffType: CertificateStaffType.ForPlaceOfWork, 
              educationEntryId: activeTab 
            }
          : { 
              type: CertificateType.ForPlaceWhereNeeded,
              staffType: data.certificateType as CertificateStaffType,
              employeePostId: activeTab 
            }
        ),
        userType: userType,
        receiveType: data.receiveType as CertificateReceiveType
      };

      await createCertificate(requestData);
      showNotification(dispatch, 'Справка успешно заказана', NotificationTypeEnum.SUCCESS, 5000);
      
      await loadCertificates();
    } catch (error) {
      showNotification(dispatch, 'Ошибка при заказе справки', NotificationTypeEnum.ERROR, 5000);
    } finally {
      setIsCreatingCertificate(false);
    }
  };

  const handleDownload = async (certificateId: string, fileType: 'certificate' | 'signature' = 'certificate') => {
    try {
      const certificate = certificates.find(cert => cert.id === certificateId);
      if (!certificate) {
        showNotification(dispatch, 'Справка не найдена', NotificationTypeEnum.ERROR, 5000);
        return;
      }

      const file = fileType === 'certificate' ? certificate.certificateFile : certificate.signatureFile;
      if (!file) {
        showNotification(dispatch, 'Файл не найден', NotificationTypeEnum.ERROR, 5000);
        return;
      }

      await downloadFile(file.id, file.name, file.extension);
      showNotification(dispatch, 'Файл успешно скачан', NotificationTypeEnum.SUCCESS, 3000);
    } catch (error) {
      showNotification(dispatch, 'Ошибка скачивания файла', NotificationTypeEnum.ERROR, 5000);
    }
  };


  const activeTabInfo = tabsData.find((tab: TabInfoData) => tab.id === activeTab);
  const isEmployee = !!employeeData;
  const isStudent = !!studentData;

  return (
    <div className={styles.container}>
      {tabsData.length > 0 && (
        <div className={styles.tabsContainer}>
          {tabsData.map((tabInfo: TabInfoData) => (
            <div
              key={tabInfo.id}
              className={`${styles.tab} ${activeTab === tabInfo.id ? styles.tabActive : ''}`}
              onClick={() => setActiveTab(tabInfo.id)}
            >
              <div className={styles.tabContent}>
                <h3 className={styles.institute}>{tabInfo.institute}</h3>
                <p className={styles.level}>
                  <FormattedMessage id={isStudent ? 'educationLevelLabel' : 'positionLabel'} />: {tabInfo.level}
                </p>
                <p className={styles.status}>{tabInfo.status}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {tabsData.length > 0 && activeTabInfo && (
        <div className={styles.educationInfo}>
          <div className={styles.educationDetails}>
            <div className={styles.row}>
              <div className={styles.column}>
                <p className={styles.label}>
                  <FormattedMessage id={isStudent ? 'educationLevelLabel' : 'positionLabel'} />
                </p>
                <p className={styles.value}>{activeTabInfo.level}</p>
              </div>
              <div className={styles.column}>
                <p className={styles.label}>
                  <FormattedMessage id={isStudent ? 'statusLabel' : 'rateLabel'} />
                </p>
                <p className={styles.value}>{activeTabInfo.status}</p>
              </div>
            </div>
            <div className={styles.divider} />
            <div className={styles.row}>
              <div className={styles.column}>
                <p className={styles.label}>
                  <FormattedMessage id={isStudent ? 'facultyLabel' : 'workPlaceLabel'} />
                </p>
                <p className={styles.value}>{activeTabInfo.faculty}</p>
              </div>
            </div>
            <div className={styles.divider} />
            <div className={styles.row}>
              <div className={styles.column}>
                <p className={styles.label}>
                  <FormattedMessage id={isStudent ? 'directionLabel' : 'positionTypeLabel'} />
                </p>
                <p className={styles.value}>{activeTabInfo.direction}</p>
              </div>
              <div className={styles.column}>
                <p className={styles.label}>
                  <FormattedMessage id={isStudent ? 'groupLabel' : 'employmentTypeLabel'} />
                </p>
                <p className={styles.value}>{activeTabInfo.group}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <CertificateOrderForm
        userType={userType}
        onSubmit={handleOrder}
        isSubmitting={isCreatingCertificate}
      />

      <CertificatesList
        certificates={certificates}
        userType={userType}
        isLoading={isLoadingCertificates}
        onDownload={handleDownload}
      />
    </div>
  );
}; 