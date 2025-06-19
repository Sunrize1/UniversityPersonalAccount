import { FC, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { LinksListProps } from '../../../types/components/common/LinksTypes';
import { LinkCard } from '../LinkCard/LinkCard';
import { Spinner } from '../../UI/Spinner/Spinner';
import styles from './LinkList.module.css';

import ChevronLeftIcon from '../../../assets/icons/Arrow/black/Chevron_Left_MD.svg?react';
import ChevronRightIcon from '../../../assets/icons/Arrow/black/Chevron_Right_MD.svg?react';

export const LinksList: FC<LinksListProps> = ({ 
  links, 
  pagination, 
  onLinkClick, 
  onPageChange,
  isLoading = false 
}) => {
  const intl = useIntl();
  const pageNumbers = useMemo(() => {
    if (!pagination || pagination.pageCount <= 1) return [];
    
    const current = pagination.pageNumber;
    const total = pagination.pageCount;
    const pages: (number | string)[] = [];
    
    if (current > 3) {
      pages.push(1);
      if (current > 4) {
        pages.push('...');
      }
    }
    
    for (let i = Math.max(1, current - 2); i <= Math.min(total, current + 2); i++) {
      pages.push(i);
    }
    
    if (current < total - 2) {
      if (current < total - 3) {
        pages.push('...');
      }
      pages.push(total);
    }
    
    return pages;
  }, [pagination]);

  const handlePageClick = (page: number) => {
    if (onPageChange && page !== pagination?.pageNumber) {
      onPageChange(page);
    }
  };

  const handlePrevClick = () => {
    if (pagination && pagination.hasPreviousPage && onPageChange) {
      onPageChange(pagination.pageNumber - 1);
    }
  };

  const handleNextClick = () => {
    if (pagination && pagination.hasNextPage && onPageChange) {
      onPageChange(pagination.pageNumber + 1);
    }
  };

  if (isLoading) {
    return (
      <div className={styles.container}>
        <Spinner />
      </div>
    );
  }

  if (links.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.emptyState}>
          <h3 className={styles.emptyStateTitle}>{intl.formatMessage({ id: 'noLinksFound' })}</h3>
          <p className={styles.emptyStateText}>
            {intl.formatMessage({ id: 'noLinksFoundText' })}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.linksList}>
        {links.map((link) => (
          <LinkCard 
            key={link.id} 
            link={link} 
            onLinkClick={onLinkClick}
          />
        ))}
      </div>
      
      {pagination && pagination.pageCount > 1 && (
        <div className={styles.pagination}>
          <button 
            className={styles.paginationButton}
            onClick={handlePrevClick}
            disabled={!pagination.hasPreviousPage}
          >
            <ChevronLeftIcon className={styles.paginationIcon} />
          </button>
          
          <div className={styles.paginationNumbers}>
            {pageNumbers.map((page, index) => (
              typeof page === 'number' ? (
                <button
                  key={page}
                  className={`${styles.pageNumber} ${
                    page === pagination.pageNumber ? styles.active : ''
                  }`}
                  onClick={() => handlePageClick(page)}
                >
                  {page}
                </button>
              ) : (
                <span key={`ellipsis-${index}`} className={styles.ellipsis}>
                  {page}
                </span>
              )
            ))}
          </div>
          
          <button 
            className={styles.paginationButton}
            onClick={handleNextClick}
            disabled={!pagination.hasNextPage}
          >
            <ChevronRightIcon className={styles.paginationIcon} />
          </button>
        </div>
      )}
    </div>
  );
};