import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BreadcrumbsState, BreadcrumbItem } from "../../types/redux/BreadcrumbsState";

const initialState: BreadcrumbsState = {
    items: [
        {
            id: "home",
            label: "main",
            path: "/"
        }
    ]
}

export const breadcrumbsSlice = createSlice({
    name: "breadcrumbs",
    initialState: initialState,
    reducers: {
        setBreadcrumbs: (state, action: PayloadAction<BreadcrumbItem[]>) => {
            state.items = action.payload;
        },
        addBreadcrumb: (state, action: PayloadAction<BreadcrumbItem>) => {
            const exists = state.items.find(item => item.id === action.payload.id);
            if (!exists) {
                state.items.push(action.payload);
            }
        },
        clearBreadcrumbs: (state) => {
            state.items = [
                {
                    id: "home",
                    label: "main",
                    path: "/"
                }
            ];
        }
    }
})

export const { setBreadcrumbs, addBreadcrumb, clearBreadcrumbs } = breadcrumbsSlice.actions; 