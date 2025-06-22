import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { API_BASE_URL } from "../../../api/instance";
import styles from './UserDetails.module.css'
import { Container } from "../../UI/Container/Container";
import { Spinner } from "../../UI/Spinner/Spinner";
import { ProfileResponse } from "../../../types/api/profileResponse";
import { getUserForAdmin } from "../../../api/requests/getUserForAdmin";
import { useParams } from 'react-router-dom';
import { showNotification } from "../../../utils/notification";
import { NotificationTypeEnum } from "../../../types/redux/NotificationTypeEnum";
import { FormattedMessage } from "react-intl";

export const UserDetails = () => {

  const dispatch = useAppDispatch();
  const [isAvatarLoading, setIsAvatarLoading] = useState(true);
  const [user, setUser] = useState<ProfileResponse>()
  const { id } = useParams<{ id: string }>();

  const avatarUrl = user?.avatar?.id ? `${API_BASE_URL}/files/${user.avatar.id}` : null;

  const handleAvatarLoad = () => {
    setIsAvatarLoading(false);
  };

  const handleAvatarError = () => {
    setIsAvatarLoading(false); 
  };

  const fetchProfile = async () => {
    if (!id) return;

    try {
        const data = await getUserForAdmin(id);
        setUser(data.data)
    } catch (error) {
        showNotification(dispatch, "Ошибка при загрузке данных пользователя", NotificationTypeEnum.ERROR)
    }
  }

  useEffect(() => {
    fetchProfile()
  },[id])


  return (
    <Container>
      <h2 className={styles.userName}>
          {user?.lastName} {user?.firstName} {user?.patronymic}
        </h2>
      <div className={styles.profileWrapper}>
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
    </Container>
  );
};