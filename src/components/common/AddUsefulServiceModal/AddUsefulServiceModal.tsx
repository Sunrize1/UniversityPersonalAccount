import styles from './AddUsefulServiceModal.module.css'
import CloseIcon  from '../../../assets/icons/Interface/black/Close_MD.svg?react';
import { FormattedMessage } from 'react-intl';
import { AddUsefulServiceModalProps } from '../../../types/components/common/AddUsefulServiceModalProps';
import { Button } from '../../UI/Button/Button';
import { FormProvider, useForm } from 'react-hook-form';
import { Input } from '../../UI/Input/Input';
import { Select } from '../../UI/Select/Select';
import { Textarea } from '../../UI/Textarea/Textarea';
import { UsefulServiceCategory } from '../../../types/api/UsefulServicesResponse';
import { EditCreateUsefulServiceRequest } from '../../../types/api/CreateUsefulServiceRequest';
import { createUsefulService } from '../../../api/requests/createUsefulService';
import { useAppDispatch } from '../../../store/hooks';
import { showNotification } from '../../../utils/notification';
import { NotificationTypeEnum } from '../../../types/redux/NotificationTypeEnum';

export const AddUsefulServiceModal = ({isOpen, onClose, serviceData, image} : AddUsefulServiceModalProps) => {
    const dispatch = useAppDispatch();
    
    const methods = useForm<EditCreateUsefulServiceRequest>({
        defaultValues: {
            title: serviceData?.title || '',
            category: serviceData?.category || UsefulServiceCategory.ForAll,
            description: serviceData?.description || '',
            link: serviceData?.link || '',
            termsOfDisctribution: serviceData?.termsOfDisctribution || '',
            logoId: serviceData?.logoId || ''
        },
        mode: 'onChange'
    });

    const { handleSubmit, formState: { isValid, isSubmitting }, register, reset } = methods;

    const categoryOptions = [
        { value: UsefulServiceCategory.ForAll, label: 'ForAll' },
        { value: UsefulServiceCategory.Students, label: 'Student' },
        { value: UsefulServiceCategory.Employees, label: 'Employee' }
    ];

    const onSubmit = async (data: EditCreateUsefulServiceRequest) => {
        try {
            await createUsefulService(data);
            showNotification(dispatch, 'Полезный сервис успешно создан', NotificationTypeEnum.SUCCESS, 5000);
            reset();
            onClose();
        } catch (error) {
            showNotification(dispatch, 'Ошибка при создании полезного сервиса', NotificationTypeEnum.ERROR, 5000);
        }
    };

    const handleClose = () => {
        reset();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <button className={styles.closeButton} onClick={handleClose}>
                    <CloseIcon />
                </button>
                <div className={styles.content}>
                     <h3 className={styles.title}>
                        <FormattedMessage id="addUsefulService" defaultMessage="Добавить полезный сервис" />
                    </h3>
                    <FormProvider {...methods}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className={styles.formFields}>
                                <Input
                                    {...register('title', {
                                        required: 'Название обязательно',
                                        minLength: {
                                            value: 3,
                                            message: 'Название должно содержать минимум 3 символа'
                                        },
                                        maxLength: {
                                            value: 100,
                                            message: 'Название не должно превышать 100 символов'
                                        }
                                    })}
                                    name="title"
                                    label="title"
                                    placeholder=""
                                />

                                <Input
                                    {...register('link', {
                                        required: 'Ссылка обязательна',
                                        pattern: {
                                            value: /^https?:\/\/.+/,
                                            message: 'Введите корректную ссылку'
                                        }
                                    })}
                                    name="link"
                                    label="link"
                                    placeholder=""
                                    type="url"
                                />

                                <Select
                                    {...register('category', {
                                        required: 'Категория обязательна'
                                    })}
                                    name="category"
                                    label="category"
                                    options={categoryOptions}
                                    placeholder=""
                                />

                                <Textarea
                                    {...register('description', {
                                        required: 'Описание обязательно',
                                        minLength: {
                                            value: 10,
                                            message: 'Описание должно содержать минимум 10 символов'
                                        },
                                        maxLength: {
                                            value: 500,
                                            message: 'Описание не должно превышать 500 символов'
                                        }
                                    })}
                                    name="description"
                                    label="description"
                                    placeholder=""
                                    rows={4}
                                />

                                <Textarea
                                    {...register('termsOfDisctribution', {
                                        required: 'Условия распространения обязательны',
                                        minLength: {
                                            value: 5,
                                            message: 'Условия должны содержать минимум 5 символов'
                                        },
                                        maxLength: {
                                            value: 300,
                                            message: 'Условия не должны превышать 300 символов'
                                        }
                                    })}
                                    name="termsOfDisctribution"
                                    label="termsOfDistribution"
                                    placeholder=""
                                    rows={3}
                                />
                            </div>
                        </form>
                    </FormProvider>
                    <div className={styles.footer}>
                        <Button
                            variant="primary"
                            onClick={handleSubmit(onSubmit)}
                            disabled={!isValid || isSubmitting}
                        >
                            save
                        </Button>

                        <Button
                            variant="outline"
                            onClick={handleClose}
                            disabled={isSubmitting}
                        >
                            cancel
                        </Button>
                    
                    
                    </div>
                </div>

            </div>
        </div>
    )
}
