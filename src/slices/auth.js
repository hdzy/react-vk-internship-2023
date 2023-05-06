import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from "axios";
import {fetchPosts} from "./posts.js";

export const fetchUserData = createAsyncThunk('auth/fetchUserData', async (params) => {
        const {data} = await axios.get('http://localhost:3000/login', params);
        return data;
})

const initialState = {
    data: null,
    status: 'loading',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: {
        [fetchUserData.pending]: (state) => {
            state.status = 'loading';
            state.data = null;
        },
        [fetchUserData.fulfilled]: (state, action) => {
            state.data = action.payload;
            state.status = 'ready';
        },
        [fetchUserData.rejected]: (state) => {
            state.data = null;
            state.status = 'error';
        },
    }
})

export const authReducer = authSlice.reducer;
