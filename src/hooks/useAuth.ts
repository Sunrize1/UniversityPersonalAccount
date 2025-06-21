import { useAppSelector } from '../store/hooks';

export const useAuth = () => {
    const { accessToken, user, status } = useAppSelector((state) => state.user);
    
    return {
        isAuthenticated: !!accessToken,
        user,
        status,
        accessToken
    };
}; 