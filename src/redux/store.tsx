import { configureStore } from '@reduxjs/toolkit';
import {postsReducer} from "../slices/posts.js";
// @ts-ignore
import {userReducer} from "../slices/user.js";
import {authReducer} from "../slices/auth.js";

export const store = configureStore({
    reducer: {
        posts: postsReducer,
        auth: authReducer,
        user: userReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>