import { FormattedMessage } from 'react-intl';
import LogoutIcon from '../../../assets/icons/Interface/black/Log_Out.svg?react';
import styles from './Logout.module.css';
import { useAppDispatch } from '../../../store/hooks';
import { logoutThunk } from '../../../store/userSlice/userThunks';
import { useNavigate } from 'react-router-dom';
import { persistor } from '../../../store/store';

export const Logout = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            navigate('/login');
            await dispatch(logoutThunk()).unwrap();
            await persistor.purge();
        } catch (error) {
            navigate('/login');
            await persistor.purge();
        }
    }

    return (
    <div className={styles.logoutContainer} onClick={handleLogout}>
        <h4 className={styles.logoutTitle}><FormattedMessage id="logout" /></h4>
        <LogoutIcon />
    </div>
    );
};