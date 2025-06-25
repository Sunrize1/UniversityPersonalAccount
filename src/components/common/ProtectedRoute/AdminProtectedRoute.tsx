import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { useIntl } from 'react-intl';
import { NotificationTypeEnum } from '../../../types/redux/NotificationTypeEnum';
import { showNotification } from '../../../utils/notification';

interface ProtectedRouteProps {
    children: ReactNode;
}

export const AdminProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const userTypes = useAppSelector(state => state.user.user?.userTypes);
    const dispatch = useAppDispatch();
    const intl = useIntl()

    const isAdmin = userTypes?.length === 0;

    if (!isAdmin) {
        showNotification(dispatch, intl.formatMessage({ id: 'notAllowed' }), NotificationTypeEnum.WARNING)
        return <Navigate to="/events" />
    }

    return <>{children}</>;
}; 