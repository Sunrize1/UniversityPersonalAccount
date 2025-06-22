import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect } from "react";
import { showNotification } from "../../utils/notification";
import { NotificationTypeEnum } from "../../types/redux/NotificationTypeEnum";
import { Container } from "../../components/UI/Container/Container";
import UsersIcon from "../../assets/icons/User/black/Users.svg?react";
import LinkIcon from "../../assets/icons/User/black/Link.svg?react";
import MapIcon from "../../assets/icons/User/black/Map.svg?react";
import { Breadcrumbs } from "../../components/common/Breadcrumbs/Breadcrumbs";
import { AdminServiceCardList } from "../../components/common/AdminServiceCardList/AdminServiceCardList";
import { useBreadcrumbs } from "../../hooks/useBreadcrumbs";
import { useIntl } from "react-intl";
import styles from './admin.module.css';


export const Admin = () => {
    const dispatch = useAppDispatch();
    const intl = useIntl();
    const userTypes = useAppSelector(state => state.user.user?.userTypes);
    const navigate = useNavigate();
    const { setBreadcrumbItems } = useBreadcrumbs();

    const isAdmin = userTypes?.length === 0;

    useEffect(() => {
        if (!isAdmin) {
            navigate('/events')
            showNotification(dispatch, "Недостаточно прав", NotificationTypeEnum.WARNING)
        }
    }, [isAdmin]);

    useEffect(() => {
        setBreadcrumbItems([
          {
            id: "home",
            label: "Главная",
            path: "/events"
          },
          {
            id: "admin",
            label: "Администрирование",
            path: "/admin"
          }
        ]);
      }, [setBreadcrumbItems]);

    const services = [
        {
            id: 1,
            name: intl.formatMessage({ id: 'users' }),
            description: intl.formatMessage({id: 'serviceDescription'}),
            icon: <UsersIcon />,
            onClick: () => navigate('/admin/users')
        },
        {
            id: 2,
            name: intl.formatMessage({ id: 'usefulServices' }),
            description: intl.formatMessage({id: 'serviceDescription'}),
            icon: <LinkIcon />,
            onClick: () => navigate('/admin/useful-services')
        },
        {
            id: 3,
            name: intl.formatMessage({ id: 'events' }),
            description: intl.formatMessage({id: 'serviceDescription'}),
            icon: <MapIcon />,
            onClick: () => navigate('/admin/events')
        }
    ]


  return (
    <Container>
      <div className={styles.content}>
        <Breadcrumbs/>
        <AdminServiceCardList services={services} />
      </div>
    </Container>
  );
};