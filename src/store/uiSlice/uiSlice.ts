import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UIState } from "../../types/redux/uiState";
import { LanguageEnum } from "../../types/redux/LanguageEnum";

const initialState: UIState = {
    language: LanguageEnum.RUSSIAN,
    isModalOpen: false,
    errorMessage: null,
}

export const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        setLanguage(state, action: PayloadAction<LanguageEnum>) {
            state.language = action.payload;
        },
        setModalOpen(state, action: PayloadAction<boolean>) {
            state.isModalOpen = action.payload;
        },
        setErrorMessage(state, action: PayloadAction<string | null>) {
            state.errorMessage = action.payload;
            state.isModalOpen = !!action.payload;
        },
        clearError(state) {
            state.errorMessage = null;
            state.isModalOpen = false;
        },
    }
});

export const {  setModalOpen, setErrorMessage, clearError } = uiSlice.actions;

