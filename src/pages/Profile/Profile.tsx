import { useEffect, useState } from "react";
import { Container } from "../../components/UI/Container/Container";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import styles from './Profile.module.css';
import { fetchProfileThunk } from "../../store/userSlice/userThunks";
import { StatusEnum } from "../../types/redux/StatusEnum";
import { useAuthRedirect } from "../../hooks/useAuthRedirect";
import { API_BASE_URL } from "../../api/instance";
import { ProfileInfo } from "../../components/common/ProfileInfo/ProfileInfo";
import { FormattedMessage } from "react-intl";
import { Spinner } from "../../components/UI/Spinner/Spinner";

export const Profile = () => {
  useAuthRedirect();

  const dispatch = useAppDispatch();
  const [isAvatarLoading, setIsAvatarLoading] = useState(true);
  const { user, status, accessToken } = useAppSelector((state) => state.user);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const avatarUrl = user?.avatar?.id ? `${API_BASE_URL}/files/${user.avatar.id}` : null;

  const handleAvatarLoad = () => {
    setIsAvatarLoading(false);
  };

  const handleAvatarError = () => {
    setIsAvatarLoading(false); 
  };

  useEffect(() => {
    if (accessToken && !user && status !== StatusEnum.loading) {
      dispatch(fetchProfileThunk());
    }
  }, [dispatch, accessToken, user, status]);

  useEffect(() => {
    const handleResize = () => {
      const shouldMove = window.innerWidth < 1000;
      setIsSmallScreen(shouldMove);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [isSmallScreen]);

  if (status === StatusEnum.loading) {
    return (
      <Container>
        <div className={styles.profileWrapper}>
          <p><FormattedMessage id="loading" defaultMessage="Загрузка..." /></p>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      {isSmallScreen && (
        <h2 className={styles.userName}>
          {user?.lastName} {user?.firstName} {user?.patronymic}
        </h2>
      )}
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
              <div className={styles.avatar} />
            )}
          </div>
          <div className={styles.infoBlock + ' ' + styles.personalData}>
            <h3><FormattedMessage id="personalData" defaultMessage="Личные данные" /></h3>
            <div className={styles.listContainer}>
              <div className={styles.listItem}>
                <p className={'p2' + ' ' + styles.key1}>
                  <FormattedMessage id="gender" defaultMessage="Пол" />
                </p>
                <p className={'p1' + ' ' + styles.value}>
                {user?.gender}
                </p>
              </div>
              <div className={styles.listItem}>
                <p className={'p2' + ' ' + styles.key1}>
                  <FormattedMessage id="birthDate" defaultMessage="Дата рождения" />
                </p>
                <p className={'p1' + ' ' + styles.value}>
                  {user?.birthDate.toString()}
                </p>
              </div>
              <div className={styles.listItem}>
                <p className={'p2' + ' ' + styles.key1}>
                  <FormattedMessage id="citizenship" defaultMessage="Гражданство" />
                </p>
                <p className={'p1' + ' ' + styles.value}>
                  {user?.citizenship.name}
                </p>
              </div>
              <div className={styles.listItem}>
                <p className={'p2' + ' ' + styles.key1}>
                  <FormattedMessage id="email" defaultMessage="Email" />
                </p>
                <p className={'p1' + ' ' + styles.value}>
                  {user?.email}
                </p>
              </div>
            </div>
          </div>
          <div className={styles.infoBlock + ' ' + styles.contacts}>
            <h3><FormattedMessage id="contacts" defaultMessage="Контакты" /></h3>
            {user?.contacts.map((contact) => (
              <div key={contact.type} className={styles.listItem}>
                <p className={'p2' + ' ' + styles.key1}>
                {contact.type}
                </p>
                <p className={'p1' + ' ' + styles.value}>
                  {contact.value}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.details}>
          {!isSmallScreen && (
            <h2 className={styles.userName}>
              {user?.lastName} {user?.firstName} {user?.patronymic}
            </h2>
          )}
          <ProfileInfo />
        </div>
      </div>
    </Container>
  );
};