import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UIState } from "../../types/redux/UIState";

const initialState: UIState = {
    isSidebarHidden: false,
    isSidebarActive: false
}

export const UISlice = createSlice({
    name: "UI",
    initialState: initialState,
    reducers: {
        setIsSidebarHidden: (state, action: PayloadAction<boolean>) => {
            state.isSidebarHidden = action.payload;
        },
        toggleIsSidebarActive: (state) => {
            state.isSidebarActive = !state.isSidebarActive;
        }
    }
})

export const { setIsSidebarHidden, toggleIsSidebarActive } = UISlice.actions;
