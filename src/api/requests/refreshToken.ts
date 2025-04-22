import axios from "axios";
import { store } from "../../store/store";
import { RefreshResponse } from "../../types/api/refreshResponse";
import { API_BASE_URL } from "../instance";

export function refreshAccessToken() {
  const refreshToken = store.getState().user.refreshToken;

  if (!refreshToken) {
      throw new Error('Refresh token not found');
  }

  return axios.post<RefreshResponse>(
      `${API_BASE_URL}/Auth/refresh`,
      { refreshToken },
      { headers: { 'Content-Type': 'application/json' } }
  );
};