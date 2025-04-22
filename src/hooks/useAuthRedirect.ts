import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';

export const useAuthRedirect = () => {
    const navigate = useNavigate();
    const { accessToken } = useAppSelector((state) => state.user);

    useEffect(() => {
        if (!accessToken) {
            navigate('/login');
        }
    }, [accessToken, navigate]);
};