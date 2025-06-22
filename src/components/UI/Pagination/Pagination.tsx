import { FC, useMemo } from 'react';
import styles from './Pagination.module.css';

import ChevronLeftIcon from '../../../assets/icons/Arrow/black/Chevron_Left_MD.svg?react';
import ChevronRightIcon from '../../../assets/icons/Arrow/black/Chevron_Right_MD.svg?react';
import { PaginationProps } from '../../../types/components/UI/pagination';



export const Pagination: FC<PaginationProps> = ({ 
  pagination, 
  onPageChange 
}) => {
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
    if (page !== pagination.pageNumber) {
      onPageChange(page);
    }
  };

  const handlePrevClick = () => {
    if (pagination.hasPreviousPage) {
      onPageChange(pagination.pageNumber - 1);
    }
  };

  const handleNextClick = () => {
    if (pagination.hasNextPage) {
      onPageChange(pagination.pageNumber + 1);
    }
  };

  if (pagination.pageCount <= 1) {
    return null;
  }

  return (
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
  );
}; 