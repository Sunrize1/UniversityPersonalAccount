import { FC } from "react";
import { LinksListProps } from "../../../types/components/common/LinksTypes";
import { useIntl } from "react-intl";
import { Spinner } from "../../UI/Spinner/Spinner";
import styles from './UsefulServicesCardsList.module.css'
import { UsefulServiceCard } from "../UsefulServiceCard/UsefulServiceCard";
import { Pagination } from "../../UI/Pagination/Pagination";
import { UsefulServiceCardListProps } from "../../../types/components/common/UsefulServicesProps";


export const UsefulServicesCardsList: FC<UsefulServiceCardListProps> = ({ 
    links, 
    pagination, 
    onAction, 
    onPageChange,
    isLoading = false,
    onEdit
  }) => {
    const intl = useIntl();
  
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
            <UsefulServiceCard
            key={link.id} 
            link={link} 
            onAction={onAction}
            onEdit={onEdit}
          />
          ))}
        </div>
        
        {pagination && onPageChange && (
          <Pagination 
            pagination={pagination}
            onPageChange={onPageChange}
          />
        )}
      </div>
    );
  };