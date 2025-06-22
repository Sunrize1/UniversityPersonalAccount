import { useEffect, useState } from "react";
import { Container } from "../../components/UI/Container/Container";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import styles from './Profile.module.css';
import { fetchProfileThunk } from "../../store/userSlice/userThunks";
import { StatusEnum } from "../../types/redux/StatusEnum";
import { API_BASE_URL } from "../../api/instance";
import { ProfileInfo } from "../../components/common/ProfileInfo/ProfileInfo";
import { FormattedMessage } from "react-intl";
import { Spinner } from "../../components/UI/Spinner/Spinner";
import { AvatarUpdateModal } from "../../components/common/AvatarUpdateModal/AvatarUpdateModal";

export const Profile = () => {

  const dispatch = useAppDispatch();
  const [isAvatarLoading, setIsAvatarLoading] = useState(true);
  const { user, status, accessToken } = useAppSelector((state) => state.user);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);

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
                onClick={() => setIsAvatarModalOpen(true)}
              />
            </>
            ) : (
              <div 
                className={styles.avatar} 
                onClick={() => setIsAvatarModalOpen(true)}
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
        <div className={styles.details}>
          {!isSmallScreen && (
            <h2 className={styles.userName}>
              {user?.lastName} {user?.firstName} {user?.patronymic}
            </h2>
          )}
          <ProfileInfo />
        </div>
      </div>
      
      <AvatarUpdateModal
        isOpen={isAvatarModalOpen}
        onClose={() => setIsAvatarModalOpen(false)}
      />
    </Container>
  );
};