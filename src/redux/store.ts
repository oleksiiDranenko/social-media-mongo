import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/auth-slice'
import listReducer from './slices/posts-slice'
import commentsListReducer from './slices/comments-slice'
import { TypedUseSelectorHook, useSelector } from "react-redux";

export const store = configureStore({
    reducer: {
        authReducer,
        listReducer,
        commentsListReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;