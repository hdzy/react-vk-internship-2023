import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from "../axios.js";


export const fetchCurrentUser = createAsyncThunk('auth/fetchCurrentUser', async (params) => {
    const {data} = await axios.get(`users/${params}`);
    return data;
})

export const fetchUserPosts = createAsyncThunk('auth/fetchUserPosts', async (params) => {
    const {data} = await axios.get(`users/${params}/posts`);
    return data;
})

const initialState = {
    user: {
        posts: {
            items: [],
            status: 'loading',
        },
        friends: {
            items: [],
            status: 'loading',
        }
    },
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducer: {},
    extraReducers: {

        // Получение постов

        [fetchUserPosts.pending]: (state) => {
            state.user.posts.status = 'loading';
        },
        [fetchUserPosts.fulfilled]: (state, action) => {
            state.user.posts.items = action.payload;
            state.user.posts.status = 'ready';
        },
        [fetchUserPosts.rejected]: (state) => {
            state.user.posts.items = [];
            state.user.posts.status = 'error';
        },

        [fetchCurrentUser.pending]: (state) => {
            state.user.friends.status = 'loading';
        },
        [fetchCurrentUser.fulfilled]: (state, action) => {
            state.user.friends.items = action.payload;
            state.user.friends.status = 'ready';
        },
        [fetchCurrentUser.rejected]: (state) => {
            state.user.friends.items = [];
            state.user.friends.status = 'error';
        },
    }
});

export const userReducer = userSlice.reducer;