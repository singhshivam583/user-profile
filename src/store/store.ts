import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userSlice from "./userSlice";

export const store = configureStore({
    reducer: {
        user: userSlice,
    },
})

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;