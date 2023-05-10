import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from "../axios.js";


export const fetchUserData = createAsyncThunk('auth/fetchUserData', async (params) => {
        const {data} = await axios.post('/login', params);
        return data;
})

export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params) => {
    const {data} = await axios.post('/register', params);
    return data;
})

export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async (params) => {
    const {data} = await axios.get('/auth/me', params);
    return data;
})

const initialState = {
    data: null,
    status: 'loading',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null;
            state.status = 'idle';
        },
    },
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
        [fetchAuthMe.pending]: (state) => {
            state.status = 'loading';
            state.data = null;
        },
        [fetchAuthMe.fulfilled]: (state, action) => {
            state.data = action.payload;
            state.status = 'ready';
        },
        [fetchAuthMe.rejected]: (state) => {
            state.data = null;
            state.status = 'error';
        },
        [fetchRegister.pending]: (state) => {
            state.status = 'loading';
            state.data = null;
        },
        [fetchRegister.fulfilled]: (state, action) => {
            state.data = action.payload;
            state.status = 'ready';
        },
        [fetchRegister.rejected]: (state) => {
            state.data = null;
            state.status = 'error';
        },
    }
})


export const selectIsAuthenticated = (state) => Boolean(state.auth.data);
export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;