import { useState } from "react";
import { API_BASE_URL } from "../../../api/instance";
import styles from './UserInfo.module.css';
import { Spinner } from "../../UI/Spinner/Spinner";
import { FormattedMessage } from "react-intl";
import { UserInfoProps } from "../../../types/components/common/UserInfoProps";

export const UserInfo = ({ user }: UserInfoProps) => {
  const [isAvatarLoading, setIsAvatarLoading] = useState(true);

  const avatarUrl = user?.avatar?.id ? `${API_BASE_URL}/files/${user.avatar.id}` : null;
  const userFullName = user?.lastName + " " + user?.firstName + " " + user?.patronymic

  const handleAvatarLoad = () => {
    setIsAvatarLoading(false);
  };

  const handleAvatarError = () => {
    setIsAvatarLoading(false); 
  };



  return (
      <div className={styles.profileWrapper}>
      <h2 className={styles.userName}>
          {userFullName}
        </h2>
        <div className={styles.personalInfo}>
          <div className={styles.avatarContainer}>
            {avatarUrl ? (
              <>
              {isAvatarLoading && <Spinner />}
              <img
                className={styles.avatar}
                src={avatarUrl}
                alt='avatar'
                onLoad={handleAvatarLoad}
                onError={handleAvatarError}
                style={{ opacity: isAvatarLoading ? 0 : 1 }}
                loading="lazy"
              />
            </>
            ) : (
              <div 
                className={styles.avatar} 
              />
            )}
          </div>
          <div className={styles.info}>
            <div className={styles.infoBlock + ' ' + styles.personalData}>
              <h3><FormattedMessage id="personalData" defaultMessage="Личные данные" /></h3>
              <div className={styles.listContainer}>
                <div className={styles.listItem}>
                  <p className={styles.key1}>
                    <FormattedMessage id="gender" defaultMessage="Пол" />
                  </p>
                  <p className={styles.value}>
                  {user?.gender ? user.gender : '-'}
                  </p>
                </div>
                <div className={styles.listItem}>
                  <p className={styles.key1}>
                    <FormattedMessage id="birthDate" defaultMessage="Дата рождения" />
                  </p>
                  <p className={styles.value}>
                    {user?.birthDate ? user.birthDate.toString() : '-'}
                  </p>
                </div>
                <div className={styles.listItem}>
                  <p className={styles.key1}>
                    <FormattedMessage id="citizenship" defaultMessage="Гражданство" />
                  </p>
                  <p className={styles.value}>
                    { user?.citizenship ? user.citizenship.name : '-'}
                  </p>
                </div>
                <div className={styles.listItem}>
                  <p className={styles.key1}>
                    <FormattedMessage id="email" defaultMessage="Email" />
                  </p>
                  <p className={styles.value}>
                    {user?.email ? user.email : '-'}
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.infoBlock + ' ' + styles.contacts}>
              <h3><FormattedMessage id="contacts" defaultMessage="Контакты" /></h3>
              {user?.contacts.map((contact) => (
                <div key={contact.type} className={styles.listItem}>
                  <p className={styles.key1}>
                <FormattedMessage id={contact.type} defaultMessage={contact.type} />
                  </p>
                  <p className={styles.value}>
                    {contact.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
  );
};