import { useForm, FormProvider } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { Button } from '../../../UI/Button/Button';
import { Select } from '../../../UI/Select/Select';
import { UserType } from '../../../../types/api/profileResponse';
import { 
  CertificateType, 
  CertificateStaffType, 
  CertificateReceiveType 
} from '../../../../types/api/certificateTypes';
import { CertificateOrderFormData } from '../../../../types/components/common/CertificateOrderTypes';
import styles from './CertificateOrderForm.module.css';

interface CertificateOrderFormProps {
  userType: UserType | null;
  onSubmit: (data: CertificateOrderFormData) => Promise<void>;
  isSubmitting: boolean;
}

export const CertificateOrderForm = ({ userType, onSubmit, isSubmitting }: CertificateOrderFormProps) => {
  const methods = useForm<CertificateOrderFormData>({
    defaultValues: {
      certificateType: '',
      receiveType: ''
    }
  });

  const certificateOptions = userType === UserType.Student 
    ? [
        { value: CertificateType.ForPlaceWhereNeeded, label: 'certificateTypeForPlaceWhereNeeded' },
        { value: CertificateType.PensionForKazakhstan, label: 'certificateTypePensionForKazakhstan' }
      ]
    : [
        { value: CertificateStaffType.ForPlaceOfWork, label: 'certificateTypeForPlaceOfWork' },
        { value: CertificateStaffType.ForExperience, label: 'certificateTypeForExperience' },
        { value: CertificateStaffType.ForVisa, label: 'certificateTypeForVisa' },
        { value: CertificateStaffType.ForWorkBookCopy, label: 'certificateTypeForWorkBookCopy' }
      ];

  const receiveOptions = [
    { value: CertificateReceiveType.Electronic, label: 'receiveTypeElectronic' },
    { value: CertificateReceiveType.Paper, label: 'receiveTypePaper' }
  ];

  const handleSubmit = async (data: CertificateOrderFormData) => {
    await onSubmit(data);
    methods.reset();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)} className={styles.orderForm}>
        <h3 className={styles.sectionTitle}>
          <FormattedMessage id="orderCertificate" />
        </h3>
        <div className={styles.formFields}>
          <Select
            name="certificateType"
            label="certificateType"
            placeholder="selectCertificateTypePlaceholder"
            options={certificateOptions}
          />
          <Select
            name="receiveType"
            label="receiveType"
            placeholder="selectReceiveTypePlaceholder"
            options={receiveOptions}
          />
          <Button 
            type="submit"
            variant="primary"
            className={styles.orderButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'ordering' : 'order'}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}; 