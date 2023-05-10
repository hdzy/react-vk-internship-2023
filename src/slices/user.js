import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from "../axios.js";


export const fetchCurrentUser = createAsyncThunk('auth/fetchCurrentUser', async (params) => {
    const {data} = await axios.post('/users/', params);
    return data;
})