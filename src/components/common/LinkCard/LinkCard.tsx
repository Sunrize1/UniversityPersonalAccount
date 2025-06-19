import { FC, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { LinkCardProps } from '../../../types/components/common/LinksTypes';
import { API_BASE_URL } from '../../../api/instance';
import styles from './LinkCard.module.css';

import ArrowUpRightIcon from '../../../assets/icons/Arrow/white/Arrow_Up_Right_MD.svg?react';
import { FilterChip } from '../../UI/FilterChip/FilterChip';

export const LinkCard: FC<LinkCardProps> = ({ link, onLinkClick }) => {
  const intl = useIntl();
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

  const handleChipClick = () => {
    if (onLinkClick) {
      onLinkClick(link.link);
    } else {
      window.open(link.link, '_blank');
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.titleContainer}>
          <h4 className={styles.title}>{link.title}</h4>
        </div>
         {!isSmallScreen && (
            <FilterChip
                onClick={handleChipClick}
                children={"goToService"}
                rightIcon={<ArrowUpRightIcon />}
                variant='primary'
                className={styles.filterChip}
            >
            </FilterChip>
         )}
      </div>
      
      <div className={styles.body}>
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
        
        <div className={styles.content}>
          <p className={styles.description}>{link.description}</p>
          
          <div className={styles.termsSection}>
            <p className={styles.termsLabel}>{intl.formatMessage({ id: 'termsOfDistribution' })}</p>
            <p className={styles.termsText}>{link.termsOfDisctribution}</p>
          </div>
        </div>
        {isSmallScreen && (
            <FilterChip
                onClick={handleChipClick}
                children={"goToService"}
                rightIcon={<ArrowUpRightIcon />}
                variant='primary'
            >
            </FilterChip>
         )}
      </div>
    </div>
  );
};