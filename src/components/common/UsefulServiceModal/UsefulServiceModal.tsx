import styles from './UsefulServiceModal.module.css'
import CloseIcon  from '../../../assets/icons/Interface/black/Close_MD.svg?react';
import { FormattedMessage, useIntl } from 'react-intl';
import { UsefulServiceModalProps } from '../../../types/components/common/UsefulServiceModalProps';
import { Button } from '../../UI/Button/Button';
import { FormProvider, useForm } from 'react-hook-form';
import { Input } from '../../UI/Input/Input';
import { Select } from '../../UI/Select/Select';
import { Textarea } from '../../UI/Textarea/Textarea';
import { UsefulServiceCategory } from '../../../types/api/UsefulServicesResponse';
import { EditCreateUsefulServiceRequest } from '../../../types/api/CreateUsefulServiceRequest';
import { createUsefulService } from '../../../api/requests/createUsefulService';
import { updateUsefulService } from '../../../api/requests/updateUsefulService';
import { useAppDispatch } from '../../../store/hooks';
import { showNotification } from '../../../utils/notification';
import { NotificationTypeEnum } from '../../../types/redux/NotificationTypeEnum';
import { uploadFile } from '../../../api/requests/uploadFile';
import { useState, useEffect } from 'react';
import { ImageInput } from '../../UI/ImageInput/ImageInput';

export const UsefulServiceModal = ({isOpen, onClose, onServciceCreated, serviceData, image, serviceId} : UsefulServiceModalProps) => {
    const dispatch = useAppDispatch();
    const intl = useIntl();
    
    const isEditMode = !!serviceData && !!serviceId;
    
    const methods = useForm<EditCreateUsefulServiceRequest>({
        defaultValues: {
            title: serviceData?.title || '',
            category: serviceData?.category || UsefulServiceCategory.ForAll,
            description: serviceData?.description || '',
            link: serviceData?.link || '',
            termsOfDisctribution: serviceData?.termsOfDisctribution || '',
            logoId: serviceData?.logoId || null
        },
        mode: 'onChange'
    });

    const { handleSubmit, formState: { isValid, isSubmitting }, register, reset, setValue } = methods;

    const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);

    useEffect(() => {
        if (serviceData) {
            setValue('title', serviceData.title || '', { shouldValidate: true });
            setValue('category', serviceData.category || UsefulServiceCategory.ForAll, { shouldValidate: true });
            setValue('description', serviceData.description || '', { shouldValidate: true });
            setValue('link', serviceData.link || '', { shouldValidate: true });
            setValue('termsOfDisctribution', serviceData.termsOfDisctribution || '', { shouldValidate: true });
            setValue('logoId', serviceData.logoId || null, { shouldValidate: true });
        } else {
            setValue('title', '', { shouldValidate: true });
            setValue('category', UsefulServiceCategory.ForAll, { shouldValidate: true });
            setValue('description', '', { shouldValidate: true });
            setValue('link', '', { shouldValidate: true });
            setValue('termsOfDisctribution', '', { shouldValidate: true });
            setValue('logoId', null, { shouldValidate: true });
        }
    }, [serviceData, setValue]);

    const categoryOptions = [
        { value: UsefulServiceCategory.ForAll, label: 'ForAll' },
        { value: UsefulServiceCategory.Students, label: 'Students' },
        { value: UsefulServiceCategory.Employees, label: 'Employees' }
    ];

    const onSubmit = async (data: EditCreateUsefulServiceRequest) => {
        try {
            let logoId = data.logoId;
            if (selectedFile) {
                const response = await uploadFile(selectedFile);
                logoId = response.data.id;
            }
            
            if (isEditMode && serviceId) {
                await updateUsefulService({ ...data, logoId }, serviceId);
                showNotification(dispatch, intl.formatMessage({ id: 'success' }), NotificationTypeEnum.SUCCESS, 5000);
            } else {
                await createUsefulService({ ...data, logoId });
                showNotification(dispatch, intl.formatMessage({ id: 'success' }), NotificationTypeEnum.SUCCESS, 5000);
            }
            
            reset();
            setSelectedFile(undefined);
            onServciceCreated();
        } catch (error) {
            showNotification(dispatch, intl.formatMessage({ id: 'loadError' }), NotificationTypeEnum.ERROR, 5000);
        }
    };

    const handleClose = () => {
        reset();
        onClose();
    };

    const handleImageChange = (file?: File) => {
        setSelectedFile(file);
        if (!file) {
            setValue('logoId', '', { shouldValidate: true });
        }
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
                        <FormattedMessage 
                            id={isEditMode ? "editUsefulService" : "addUsefulService"} 
                        />
                    </h3>
                    <FormProvider {...methods}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className={styles.formFields}>
                                <Input
                                    {...register('title', {
                                        required: 'titleRequired',
                                        minLength: {
                                            value: 3,
                                            message: 'titleMinLength'
                                        },
                                        maxLength: {
                                            value: 100,
                                            message: 'titleMaxLength'
                                        }
                                    })}
                                    name="title"
                                    label="title"
                                    placeholder=""
                                />

                                <Input
                                    {...register('link', {
                                        required: 'linkRequired',
                                        pattern: {
                                            value: /^https?:\/\/.+/,
                                            message:'linkInvalid'
                                        }
                                    })}
                                    name="link"
                                    label="link"
                                    placeholder=""
                                    type="url"
                                />

                                <Select
                                    {...register('category', {
                                        required: 'categoryRequired'
                                    })}
                                    name="category"
                                    label="category"
                                    options={categoryOptions}
                                    placeholder=""
                                />

                                <Textarea
                                    {...register('description', {
                                        required: false,
                                        maxLength: {
                                            value: 500,
                                            message: 'descriptionMaxLength'
                                        }
                                    })}
                                    name="description"
                                    label="description"
                                    placeholder=""
                                    rows={4}
                                />

                                <Textarea
                                    {...register('termsOfDisctribution', {
                                        required: false,
                                        maxLength: {
                                            value: 300,
                                            message: 'termsMaxLength'
                                        }
                                    })}
                                    name="termsOfDisctribution"
                                    label="termsOfDistribution"
                                    placeholder=""
                                    rows={3}
                                />

                                <ImageInput 
                                    onFileChange={handleImageChange}
                                    name={image ? image.name + "." + image.extension : undefined}
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
                            {isEditMode ? 'update' : 'save'}
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
