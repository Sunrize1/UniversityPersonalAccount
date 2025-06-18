import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { FormattedMessage } from 'react-intl';
import styles from './Breadcrumbs.module.css';
import typography from '../../../styles/typography.module.css';
import { BreadcrumbsProps } from '../../../types/components/common/BreadcrumbsProps';
import { BreadcrumbItem } from '../../../types/redux/BreadcrumbsState';

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  className
}) => {
  const breadcrumbs = useSelector((state: RootState) => state.breadcrumbs.items);

  return (
    <div className={`${styles.container} ${className || ''}`}>
      <nav className={styles.breadcrumbsNav}>
        <ol className={styles.breadcrumbsList}>
          {breadcrumbs.map((item: BreadcrumbItem, index: number) => (
            <li key={item.id} className={styles.breadcrumbItem}>
              <span 
                className={`${styles.breadcrumbText} ${typography.p1} ${index === breadcrumbs.length - 1 ? styles.breadcrumbActive : ''}`}
              >
                <FormattedMessage id={item.label} />
              </span>
              {index < breadcrumbs.length - 1 && (
                <span className={styles.separator}>
                  /
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}; 