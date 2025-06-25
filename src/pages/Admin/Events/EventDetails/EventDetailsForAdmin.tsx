import { useParams } from "react-router-dom"
import { AdminEventInfo } from "../../../../components/common/AdminEventInfo/AdminEventInfo"
import { Breadcrumbs } from "../../../../components/common/Breadcrumbs/Breadcrumbs"
import { Container } from "../../../../components/UI/Container/Container"
import styles from './EventDetailsForAdmin.module.css'
import { useAppDispatch } from "../../../../store/hooks"
import { useBreadcrumbs } from "../../../../hooks/useBreadcrumbs"
import { EventFullDto } from "../../../../types/api/eventsTypes"
import { useEffect, useState } from "react"
import { getEventDetailsForAdmin } from "../../../../api/requests/getEventDetailsForAdmin"
import { showNotification } from "../../../../utils/notification"
import { NotificationTypeEnum } from "../../../../types/redux/NotificationTypeEnum"
import { Spinner } from "../../../../components/UI/Spinner/Spinner"
import { useIntl } from "react-intl"

export const EventDetailsForAdmin = () => {
    const dispatch = useAppDispatch();
    const { setBreadcrumbItems} = useBreadcrumbs();
    const [event, setEvent] = useState<EventFullDto>()
    const { id } = useParams<{ id: string }>();
    const intl = useIntl();

    
  const fetchEvent = async () => {
    if (!id) return;
    try {
        const data = await getEventDetailsForAdmin(id);
        setEvent(data.data)
        renderBreadcrumbs(data.data.title);
        } catch (error) {
            showNotification(dispatch, intl.formatMessage({ id: 'loadError' }), NotificationTypeEnum.ERROR)
        } 
    }

    const handleEdit = () => {
        fetchEvent();
    }



    useEffect(() => {
        fetchEvent()
    },[id])

    const renderBreadcrumbs = (eventTitle: string) => {
        setBreadcrumbItems([
          {id: '1', label: intl.formatMessage({id: 'main'}), path: "/events"},
          { id: '2', label: intl.formatMessage({id: '/admin'}), path: '/admin' },
          { id: '3', label: intl.formatMessage({id: '/events'}), path: '/admin/events' },
          { id: '4', label: eventTitle, path: '/admin/events' },
         ])
      };

    return (
        <Container>
            <div className={styles.content}>
                <Breadcrumbs/>
               {event ?  
               <AdminEventInfo
                    event={event}
                    onEdit={handleEdit}
                /> : 
                <Spinner/>
                }
            </div>
        </Container>
    )
}