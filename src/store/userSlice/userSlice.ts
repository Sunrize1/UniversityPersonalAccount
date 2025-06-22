import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "../../types/redux/userState";
import { StatusEnum } from "../../types/redux/StatusEnum";
import { fetchProfileThunk, loginThunk, logoutThunk, refreshTokensThunk } from "./userThunks";
import { LanguageEnum } from "../../types/redux/LanguageEnum";

const initialState: UserState = {
    user: null,
    accessToken: "",
    refreshToken: "",
    status: StatusEnum.idle,
    language: LanguageEnum.RUSSIAN
}

export const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        logout: (state) => {
            state.user = null,
            state.accessToken = '';
            state.refreshToken = '';
        },
        setLanguage: (state, action: PayloadAction<LanguageEnum>) => {
            state.language = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginThunk.pending, (state) => {
                state.status = StatusEnum.loading;
            })
            .addCase(loginThunk.fulfilled, (state, action) => {
                if (action.payload.loginSucceeded) {
                    state.user = null;
                    state.status = StatusEnum.succeeded;
                    state.accessToken = action.payload.accessToken;
                    state.refreshToken = action.payload.refreshToken;
                } else {
                    state.status = StatusEnum.failed;
                    state.user = null,
                    state.accessToken = '';
                    state.refreshToken = '';
                }
            })
            .addCase(loginThunk.rejected, (state) => {
                state.status = StatusEnum.failed;
                state.user = null,
                state.accessToken = '';
                state.refreshToken = '';
            })
            .addCase(fetchProfileThunk.pending, (state) => {
                state.status = StatusEnum.loading;
            })
            .addCase(fetchProfileThunk.fulfilled, (state, action) => {
                state.status = StatusEnum.succeeded;
                state.user = action.payload; 
            })
            .addCase(fetchProfileThunk.rejected, (state) => {
                state.status = StatusEnum.failed;
                state.user = null; 
            })

            .addCase(refreshTokensThunk.pending, (state) => {
                state.status = StatusEnum.loading;
            })
            .addCase(refreshTokensThunk.fulfilled, (state, action) => {
                state.accessToken = action.payload.accessToken;
                state.refreshToken = action.payload.refreshToken;
                state.status = StatusEnum.succeeded;
            })
            .addCase(refreshTokensThunk.rejected, (state) => {
                state.status = StatusEnum.failed;
                state.user = null;
                state.accessToken = '';
                state.refreshToken = '';
            })

            .addCase(logoutThunk.fulfilled, (state) => {
                state.user = null;
                state.accessToken = '';
                state.refreshToken = '';
                state.status = StatusEnum.idle;
            })
            .addCase(logoutThunk.rejected, (state) => {
                state.user = null;
                state.accessToken = '';
                state.refreshToken = '';
                state.status = StatusEnum.idle;
            });
    
    }
 })

 export const { logout, setLanguage } = userSlice.actions;