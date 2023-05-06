import { configureStore } from '@reduxjs/toolkit';
import {postsReducer} from "../slices/posts.js";
import {authReducer} from "../slices/auth.js";

export const store = configureStore({
    reducer: {
        posts: postsReducer,
        auth: authReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>