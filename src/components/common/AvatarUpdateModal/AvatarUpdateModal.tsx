import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { FormattedMessage } from 'react-intl';
import { Button } from '../../UI/Button/Button';
import { Spinner } from '../../UI/Spinner/Spinner';
import { uploadFile } from '../../../api/requests/uploadFile';
import { updateAvatar } from '../../../api/requests/avatarUpdate';
import { useAppDispatch } from '../../../store/hooks';
import { fetchProfileThunk } from '../../../store/userSlice/userThunks';
import { NotificationTypeEnum } from '../../../types/redux/NotificationTypeEnum';
import { showNotification } from '../../../utils/notification';
import { 
  AvatarUpdateModalProps, 
  Area, 
  Point, 
  AvatarUpdateStep 
} from '../../../types/components/common/AvatarUpdateModalTypes';
import styles from './AvatarUpdateModal.module.css';
import CloseIcon  from '../../../assets/icons/Interface/black/Close_MD.svg?react';
const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous');
    image.src = url;
  });

const getCroppedImg = async (
  imageSrc: string,
  pixelCrop: Area
): Promise<Blob> => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Не удалось получить контекст canvas');
  }

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      }
    }, 'image/jpeg', 0.8);
  });
};

export const AvatarUpdateModal: React.FC<AvatarUpdateModalProps> = ({
  isOpen,
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [step, setStep] = useState<AvatarUpdateStep>('select');

  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
        setStep('crop');
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const handleUpload = async () => {
    if (!selectedImage || !croppedAreaPixels) return;

    setIsUploading(true);
    
    try {
      const croppedBlob = await getCroppedImg(selectedImage, croppedAreaPixels);
      const file = new File([croppedBlob], 'avatar.jpg', { type: 'image/jpeg' });
      
      const uploadResponse = await uploadFile(file);
      const fileId = uploadResponse.data.id;
      
      await updateAvatar(fileId);
      
      dispatch(fetchProfileThunk());
      showNotification(dispatch, 'Аватар успешно обновлен', NotificationTypeEnum.SUCCESS);
      
      handleClose();
    } catch (error) {
      console.error('Ошибка при обновлении аватара:', error);
      showNotification(dispatch, 'Ошибка при обновлении аватара', NotificationTypeEnum.ERROR);
    } finally {
      setIsUploading(false);
    }
  };

  const handleClose = () => {
    setSelectedImage(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);
    setStep('select');
    onClose();
  };

  const handleBack = () => {
    setStep('select');
    setSelectedImage(null);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h3>
            <FormattedMessage id="updateAvatar" defaultMessage="Обновить аватар" />
          </h3>
          <button className={styles.closeButton} onClick={handleClose}>
            <CloseIcon />
          </button>
        </div>

        <div className={styles.content}>
          {step === 'select' && (
            <div className={styles.selectStep}>
              <p>
                <FormattedMessage 
                  id="selectImage" 
                  defaultMessage="Выберите изображение для аватара" 
                />
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className={styles.fileInput}
              />
            </div>
          )}

          {step === 'crop' && selectedImage && (
            <div className={styles.cropStep}>
              <div className={styles.cropContainer}>
                <Cropper
                  image={selectedImage}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  onCropChange={setCrop}
                  onCropComplete={handleCropComplete}
                  onZoomChange={setZoom}
                />
              </div>
              
              <div className={styles.zoomContainer}>
                <label>
                  <FormattedMessage id="zoom" defaultMessage="Масштаб:" />
                </label>
                <input
                  type="range"
                  value={zoom}
                  min={1}
                  max={3}
                  step={0.1}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className={styles.zoomSlider}
                />
              </div>
            </div>
          )}
        </div>

        <div className={styles.footer}>
          {step === 'crop' && (
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={isUploading}
            >
              back
            </Button>
          )}
          
          {step === 'crop' && (
            <Button
              variant="primary"
              onClick={handleUpload}
              disabled={isUploading || !croppedAreaPixels}
            >
              {isUploading ? 'loading' : 'save'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}; 