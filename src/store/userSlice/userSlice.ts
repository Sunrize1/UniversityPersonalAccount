import { createSlice } from "@reduxjs/toolkit";
import { UserState } from "../../types/redux/userState";
import { StatusEnum } from "../../types/redux/StatusEnum";
import { loginThunk } from "./userThunks";

const initialState: UserState = {
    accessToken: "",
    refreshToken: "",
    status: StatusEnum.idle,
}

export const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        logout: (state) => {
            state.accessToken = '';
            state.refreshToken = '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginThunk.pending, (state) => {
                state.status = StatusEnum.loading;
            })
            .addCase(loginThunk.fulfilled, (state, action) => {
                if (action.payload.loginSucceeded) {
                    state.status = StatusEnum.succeeded;
                    state.accessToken = action.payload.accessToken;
                    state.refreshToken = action.payload.refreshToken;
                } else {
                    state.status = StatusEnum.failed;
                    state.accessToken = '';
                    state.refreshToken = '';
                }
            })
            .addCase(loginThunk.rejected, (state) => {
                state.status = StatusEnum.failed;
                state.accessToken = '';
                state.refreshToken = '';
            });
    }
 })

 export const { logout } = userSlice.actions;