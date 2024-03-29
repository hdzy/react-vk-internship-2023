import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from '../axios.js';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const { data } = await axios.get('http://localhost:3000/posts');
    return data;
})

export const fetchTags  = createAsyncThunk('posts/fetchTags', async () => {
    const { data } = await axios.get('http://localhost:3000/posts/tags');
    return data;
})

export const fetchRemovePost = createAsyncThunk('posts/removePost', async (id) => {
    await axios.delete(`http://localhost:3000/posts/${id}`);
})

const initialState = {
    posts: {
        items: [],
        status: 'loading',
    },
    tags: {
        items: [],
        status: 'loading',
    }
}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducer: {},
    extraReducers: {

        // Получение постов

        [fetchPosts.pending]: (state) => {
            state.posts.status = 'loading';
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.posts.items = action.payload;
            state.posts.status = 'ready';
        },
        [fetchPosts.rejected]: (state) => {
            state.posts.items = [];
            state.posts.status = 'error';
        },

        // Получение тегов

        [fetchTags.pending]: (state) => {
            state.tags.status = 'loading';
        },
        [fetchTags.fulfilled]: (state, action) => {
            state.tags.items = action.payload;
            state.tags.status = 'ready';
        },
        [fetchTags.rejected]: (state) => {
            state.tags.items = [];
            state.tags.status = 'error';
        },
            // Удаление поста
        [fetchRemovePost.pending]: (state, action) => {
            state.posts.items = state.posts.items.filter(post => post._id !== action.payload);
        },
    }
});

export const postsReducer = postsSlice.reducer;


