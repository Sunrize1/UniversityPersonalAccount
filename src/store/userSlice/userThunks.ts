import { createAsyncThunk } from '@reduxjs/toolkit';
import { login } from '../../api/requests/login';
import { LoginInput } from '../../types/components/forms/LoginInput';
import { loginResponse } from '../../types/api/loginResponse';
import { RootState } from '../store';

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