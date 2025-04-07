import { LanguageState } from "../../types/redux/languageState";
import { LanguageEnum } from "../../types/redux/LanguageEnum";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: LanguageState = {
    language: LanguageEnum.RUSSIAN
}

export const languageSlice = createSlice({
    name: "language",
    initialState: initialState,
    reducers: {
        setLanguage: (state, action: PayloadAction<LanguageEnum>) => {
            state.language = action.payload;
        }
    }
})

export const { setLanguage } = languageSlice.actions;
