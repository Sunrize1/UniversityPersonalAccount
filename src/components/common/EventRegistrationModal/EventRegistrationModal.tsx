import { FC, useState } from 'react';
import { useIntl } from 'react-intl';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Input } from '../../UI/Input/Input';
import { PhoneInput } from '../../UI/PhoneInput/PhoneInput';
import { Textarea } from '../../UI/Textarea/Textarea';
import { Button } from '../../UI/Button/Button';
import { externalEventRegister } from '../../../api/requests/externalEventRegister';
import { showNotification } from '../../../utils/notification';
import { useAppDispatch } from '../../../store/hooks';
import { NotificationTypeEnum } from '../../../types/redux/NotificationTypeEnum';
import CloseIcon from '../../../assets/icons/Interface/black/Close_MD.svg?react';
import styles from './EventRegistrationModal.module.css';

interface EventRegistrationFormData {
  name: string;
  email: string;
  phone: string;
  additionalInfo: string;
}

interface EventRegistrationModalProps {
  eventId: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const EventRegistrationModal: FC<EventRegistrationModalProps> = ({
  eventId,
  isOpen,
  onClose,
  onSuccess
}) => {
  const intl = useIntl();
  const dispatch = useAppDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const methods = useForm<EventRegistrationFormData>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      additionalInfo: ''
    }
  });

  const { register, handleSubmit, reset } = methods;

  const onSubmit: SubmitHandler<EventRegistrationFormData> = async (data) => {
    setIsSubmitting(true);
    try {
      await externalEventRegister({
        eventId,
        name: data.name,
        email: data.email,
        phone: data.phone,
        additionalInfo: data.additionalInfo
      });
      
      showNotification(dispatch, intl.formatMessage({ id: 'success' }), NotificationTypeEnum.SUCCESS, 5000);
      onSuccess();
      handleCancel();
    } catch (error) {
      showNotification(dispatch, intl.formatMessage({ id: 'loadError' }), NotificationTypeEnum.ERROR, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose} type="button">
          <CloseIcon />
        </button>
        
        <h3 className={styles.title}>
          {intl.formatMessage({ id: 'eventRegistration' })}
        </h3>
        
        <FormProvider {...methods}>
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <Input 
              label='fullName'
              {...register("name", {
                required: "nameIsRequired"
              })}
            />
            
            <Input 
              label='email'
              type="email"
              {...register("email", {
                required: "emailIsRequired"
              })}
            />
            
            <PhoneInput 
              label='phone'
              {...register("phone", {
                required: "phoneIsRequired",
                minLength: {
                  value: 18,
                  message: "phoneIsRequired"
                }
              })}
            />
            
            <Textarea
              label='additionalInformation'
              {...register("additionalInfo")}
            />
            
            <div className={styles.buttons}>
              <Button 
                variant="primary" 
                type="submit"
                disabled={isSubmitting}
                className={styles.submitButton}
              >
                save
              </Button>
              
              <Button 
                variant="outline" 
                type="button"
                onClick={handleCancel}
                disabled={isSubmitting}
                className={styles.cancelButton}
              >
               cancel
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}; 