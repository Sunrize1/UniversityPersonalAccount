import { combineReducers, configureStore} from "@reduxjs/toolkit";
import { userSlice } from "./userSlice/userSlice";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { notificationSlice } from "./notificationSlice/notificationSlice";
import { UISlice } from "./UISlice/UISlice";
import { breadcrumbsSlice } from "./breadcrumbsSlice/breadcrumbsSlice";


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user'], 
};

const rootReducer = combineReducers({
    user: userSlice.reducer,
    notification: notificationSlice.reducer,
    UISlice: UISlice.reducer,
    breadcrumbs: breadcrumbsSlice.reducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export const persistor = persistStore(store);

export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

