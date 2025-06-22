import React from 'react';
import ErrorImageUp from '../../../assets/images/error_stripe_up.svg?react';
import ErrorImageDown from '../../../assets/images/error_stripe_down.svg?react';
import styles from './500.module.css';
import { Button } from '../../../components/UI/Button/Button';

export const ServerErrorPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <h1 className={styles.errorNumber}>500</h1>

        <div className={styles.titleSection}>
          <div className={styles.titleGroup}>
            <h1 className={styles.titleEn}>Internal Server Error</h1>
            <h1 className={styles.titleRu}>
              Ошибка cервера
            </h1>
          </div>
          
          <Button className={styles.button} variant="primary">
            backToHome
          </Button>
        </div>

        <div className={styles.description}>
          <h3 className={styles.descriptionTitle}>
            Что случилось?
          </h3>
          <p className={styles.descriptionText}>
          Возможно на сервере произошла внутренняя ошибка или проводятся кратковременные, технические работы!
          </p>
          <p className={styles.descriptionLink}>
            Пожалуйста, сообщите нам об этой проблеме
          </p>
        </div>
      </div>

      <div className={`${styles.errorStripe} ${styles.errorStripeTop}`}>
        <div className={styles.errorStripeContent}>
          <ErrorImageUp />
        </div>
      </div>

      <div className={`${styles.errorStripe} ${styles.errorStripeBottom}`}>
        <div className={styles.errorStripeContent}>
          <ErrorImageDown />
        </div>
      </div>
    </div>
  );
};

