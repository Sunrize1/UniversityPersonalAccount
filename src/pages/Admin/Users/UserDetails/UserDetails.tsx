import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import styles from './UserDetails.module.css'
import { Container } from "../../../../components/UI/Container/Container";
import { Spinner } from "../../../../components/UI/Spinner/Spinner";
import { ProfileResponse } from "../../../../types/api/profileResponse";
import { getUserForAdmin } from "../../../../api/requests/getUserForAdmin";
import { useParams } from 'react-router-dom';
import { showNotification } from "../../../../utils/notification";
import { NotificationTypeEnum } from "../../../../types/redux/NotificationTypeEnum";
import { Breadcrumbs } from "../../../../components/common/Breadcrumbs/Breadcrumbs";
import { useBreadcrumbs } from "../../../../hooks/useBreadcrumbs";
import { UserInfo } from "../../../../components/common/UserInfo/UserInfo";
import { useIntl } from "react-intl";

export const UserDetails = () => {

  const dispatch = useAppDispatch();
  const { setBreadcrumbItems} = useBreadcrumbs();
  const [user, setUser] = useState<ProfileResponse>()
  const { id } = useParams<{ id: string }>();
  const intl = useIntl();


  const fetchProfile = async () => {
    if (!id) return;
    try {
        const data = await getUserForAdmin(id);
        setUser(data.data)
        renderBreadcrumbs(data.data.lastName, data.data.firstName, data.data.patronymic);
    } catch (error) {
        showNotification(dispatch, intl.formatMessage({ id: 'loadError' }), NotificationTypeEnum.ERROR)
    } 
  }

  const renderBreadcrumbs = (lastName: string, firstName: string, patronymic: string) => {
    setBreadcrumbItems([
      {id: 'main', label: intl.formatMessage({id: 'main'}), path: "/events"},
      { id: 'admin', label: intl.formatMessage({id: '/admin'}), path: '/admin' },
      { id: 'users', label: intl.formatMessage({id: 'users'}), path: '/admin/users' },
      {id: 'user', label: lastName + " " + firstName + " " + patronymic, path: '/admin/users'},
     ])
  };

  useEffect(() => {
    fetchProfile()
  },[id])



  return (
    <Container>
        <div className={styles.content}>
          <Breadcrumbs/>
          {user ? (
              <UserInfo user={user} />
          ) : (
              <Spinner className={styles.spinner} />
          )}
        </div>
    </Container>
  );
};