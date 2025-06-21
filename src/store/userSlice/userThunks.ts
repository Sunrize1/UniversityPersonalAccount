import { createAsyncThunk } from '@reduxjs/toolkit';
import { login } from '../../api/requests/login';
import { LoginInput } from '../../types/components/forms/LoginInput';
import { loginResponse } from '../../types/api/loginResponse';
import { RootState } from '../store';
import { ProfileResponse } from '../../types/api/profileResponse';
import { getProfile } from '../../api/requests/getProfile';
import { RefreshResponse } from '../../types/api/refreshResponse';
import { refreshAccessToken } from '../../api/requests/refreshToken';
import { logout } from '../../api/requests/logout';

export const loginThunk = createAsyncThunk<
    loginResponse,           
    LoginInput,             
    {                       
        state: RootState;
        rejectValue: string; 
    }
>(
    'user/login', 
    async (loginData: LoginInput, { rejectWithValue }) => {
        try {
            const response = await login(loginData);
            return response.data;
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Ошибка при в входе в систему';
            return rejectWithValue(errorMessage);
        }
    }
);

export const refreshTokensThunk = createAsyncThunk<
    RefreshResponse, 
    void,                                         
    { state: RootState; rejectValue: string }     
>(
    'user/refreshTokens',
    async (_, { rejectWithValue }) => {
        try {
            const response = await refreshAccessToken();
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Ошибка при обновлении токена');
        }
    }
);


export const fetchProfileThunk = createAsyncThunk<
    ProfileResponse,
    void,
    {
        state: RootState,
        rejectValue: string;
    }
>(
    'user/fetchProfile',
    async (_, { rejectWithValue }) => {
        try {
            const response = await getProfile();
            return response.data;
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Ошибка при получении данных профиля';
            return rejectWithValue(errorMessage);
        }
    }
)

export const logoutThunk = createAsyncThunk<
    void,
    void,
    {
        state: RootState,
        rejectValue: string;
    }
>(
    'user/logout',
    async (_, { rejectWithValue }) => {
        try {
            await logout();
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Ошибка при выходе из системы';
            return rejectWithValue(errorMessage);
        }
    }
)