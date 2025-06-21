import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { RootState } from '../../../store/store';
import styles from './Breadcrumbs.module.css';
import typography from '../../../styles/typography.module.css';
import { BreadcrumbsProps } from '../../../types/components/common/BreadcrumbsProps';
import { BreadcrumbItem } from '../../../types/redux/BreadcrumbsState';

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  className
}) => {
  const breadcrumbs = useSelector((state: RootState) => state.breadcrumbs.items);
  const location = useLocation();

  return (
    <div className={`${styles.container} ${className || ''}`}>
      <nav className={styles.breadcrumbsNav}>
        <ol className={styles.breadcrumbsList}>
          {breadcrumbs.map((item: BreadcrumbItem, index: number) => {
            const isActive = location.pathname.includes(item.path);
            const isLast = index === breadcrumbs.length - 1;
            
            return (
              <li key={item.id} className={styles.breadcrumbItem}>
                {isLast ? (
                  <span 
                    className={`${styles.breadcrumbText} ${typography.p1} ${styles.breadcrumbActive}`}
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link 
                    to={item.path}
                    className={`${styles.breadcrumbText} ${styles.breadcrumbLink} ${typography.p1}`}
                  >
                    {item.label}
                  </Link>
                )}
                {!isLast && (
                  <span className={styles.separator}>
                    /
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}; 