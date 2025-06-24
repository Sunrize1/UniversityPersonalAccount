import { useIntl } from 'react-intl';
import { API_BASE_URL } from '../../../api/instance';
import { LinkCardProps } from '../../../types/components/common/LinksTypes';
import EditIcon from '../../../assets/icons/Edit/black/Edit_Pencil_Line_01.svg?react';
import DeleteIcon from '../../../assets/icons/Edit/black/Trash_Full.svg?react';
import ArrowUp from '../../../assets/icons/Arrow/black/Caret_Up_MD.svg?react'
import ArrowDown from '../../../assets/icons/Arrow/black/Caret_Down_MD.svg?react'
import styles from './UsefulServiceCard.module.css'
import { useEffect, useState } from 'react';
import { deleteUsefulService } from '../../../api/requests/deleteUsefulService';
import { useAppDispatch } from '../../../store/hooks';
import { showNotification } from '../../../utils/notification';
import { NotificationTypeEnum } from '../../../types/redux/NotificationTypeEnum';
import { UsefulServiceCardProps } from '../../../types/components/common/UsefulServicesProps';

export const UsefulServiceCard = ({link, onAction, onEdit}: UsefulServiceCardProps) => {
    const intl = useIntl()
    const dispatch = useAppDispatch()
    const [isHidden, setIsHidden] = useState<boolean>(true);
    const [isSmallScreen, setIsSmallScreen] = useState(false);


    useEffect(() => {
      const handleResize = () => {
        const shouldMove = window.innerWidth <= 600;
        setIsSmallScreen(shouldMove);
      };
  
      handleResize();
  
      window.addEventListener('resize', handleResize);
  
      return () => window.removeEventListener('resize', handleResize);
    }, [isSmallScreen]);

    const handleDeleteButtonClick = async () => {
      try {
        const data = await deleteUsefulService(link.id)
        showNotification(dispatch, 'Полезный сервис успешно удален', NotificationTypeEnum.SUCCESS, 5000);
        if(onAction) onAction();
      } catch (error) {
        showNotification(dispatch, 'Ошибка при удалении полезного сервиса', NotificationTypeEnum.ERROR, 5000);
      }

    }

    const handleEditButtonClick = () => {
      if (onEdit) {
        onEdit(link);
      }
    }

    const handleExpandButtonClick = () => {
      setIsHidden(!isHidden);
    }

    return (
    <div className={styles.card}>
      <div className={styles.body}>
        <div className={styles.header}>
          <div className={styles.imageContainer}>
            {link.logo && link.logo.id ? (
              <img 
                src={`${API_BASE_URL}/Files/${link.logo.id}`} 
                alt={link.title}
                className={styles.image}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.nextElementSibling?.setAttribute('style', 'display: flex');
                }}
              />
            ) : null}
            <div 
              className={styles.imagePlaceholder}
              style={{ display: link.logo && link.logo.id ? 'none' : 'flex' }}
            >
              {intl.formatMessage({ id: 'noImage' })}
            </div>
          </div>

          {isSmallScreen && (
          <div className={styles.actions}>
            <button className={styles.actionButton} onClick={handleEditButtonClick}><EditIcon/></button>
            <button className={styles.actionButton} onClick={handleDeleteButtonClick}><DeleteIcon/></button>
          </div>
        )}
        </div>
        
        <div className={styles.content}>
          <div className={styles.titleContainer}>
            <h4 className={styles.title}>{link.title}</h4>
          </div>

          <div className={styles.row}>
            <div className={styles.termsSection}>
              <p className={styles.termsLabel}>{intl.formatMessage({ id: 'link' })}</p>
              <a href={link.link} className={styles.termsText}>{link.link}</a>
            </div>

            <div className={styles.termsSection}>
              <p className={styles.termsLabel}>{intl.formatMessage({ id: 'type' })}</p>
              <p className={styles.termsText}>{intl.formatMessage({ id: link.category == null ? 'ForAll' : link.category })}</p>
            </div>
          </div>

          <div className={isHidden ? styles.hidden : styles.expanded}>
            <div className={styles.divider} />

            <div className={styles.termsSection}>
              <p className={styles.termsLabel}>{intl.formatMessage({ id: 'description' })}</p>
              <p className={styles.termsText}>{link.description}</p>
            </div>

            <div className={styles.divider} />
            
            <div className={styles.termsSection}>
              <p className={styles.termsLabel}>{intl.formatMessage({ id: 'termsOfDistribution' })}</p>
              <p className={styles.termsText}>{link.termsOfDisctribution}</p>
            </div>
          </div>

        </div>

        {!isSmallScreen && (
          <div className={styles.actions}>
            <button className={styles.actionButton} onClick={handleEditButtonClick}><EditIcon/></button>
            <button className={styles.actionButton} onClick={handleDeleteButtonClick}><DeleteIcon/></button>
          </div>
        )}

        <span className={styles.expandButton} onClick={handleExpandButtonClick}>
          {isHidden ? <ArrowDown/> : <ArrowUp/>}
        </span>
      </div>
    </div>
    )
}