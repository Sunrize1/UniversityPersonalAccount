import React from 'react';
import styles from './404.module.css';
import ErrorImageUp from '../../../assets/images/error_stripe_up.svg?react';
import ErrorImageDown from '../../../assets/images/error_stripe_down.svg?react';
import { Button } from '../../../components/UI/Button/Button';

export const NotFoundPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={`${styles.errorStripe} ${styles.errorStripeTop}`}>
        <div className={styles.errorStripeContent}>
          <ErrorImageUp />
        </div>
      </div>

      <div className={styles.mainContent}>
        <h1 className={styles.errorNumber}>404</h1>

        <div className={styles.titleSection}>
          <div className={styles.titleGroup}>
            <h2 className={styles.titleEn}>Page not found</h2>
            <h2 className={styles.titleRu}>
              Страница не найдена
            </h2>
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
          Вероятно такой страницы не существует или вы ошиблись при вводе адреса в строку браузера
          </p>
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

