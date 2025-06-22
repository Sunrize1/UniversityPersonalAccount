import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios'
import {  store } from '../store/store';
import { refreshTokensThunk } from '../store/userSlice/userThunks';

export const API_BASE_URL = 'https://lk-stud.api.kreosoft.space/api'

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
},
})


api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const accessToken = store.getState().user.accessToken; 
  const isLoginRequest = config.url?.includes('/Auth/login'); 
  const isRefreshRequest = config.url?.includes('/Auth/refresh');

  if (accessToken && config.headers && !isLoginRequest && !isRefreshRequest) { 
      config.headers.set('Authorization', `Bearer ${accessToken}`);
  }
  return config;
});

api.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
        const isRefreshRequest = originalRequest.url?.includes('/Auth/refresh');

        if (error.response?.status !== 401 || originalRequest._retry || isRefreshRequest) {
            return Promise.reject(error);
        }

        originalRequest._retry = true;

        try {
            
            const result = await store.dispatch(refreshTokensThunk());

            if (refreshTokensThunk.fulfilled.match(result)) {
                const newAccessToken = result.payload.accessToken;
                
                const newConfig = {
                    ...originalRequest,
                    headers: {
                        ...originalRequest.headers,
                        Authorization: `Bearer ${newAccessToken}`,
                    },
                    _retry: undefined
                };

                return api(newConfig);
            } else {
                throw new Error('Ошибка при обновлении токена');
            }
        } catch (refreshError) {
            store.dispatch({ type: 'user/logout' });
            return Promise.reject(refreshError);
        }
    }
);

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 500) {
      window.location.href = '/500';
    }
    return Promise.reject(error);
  }
);