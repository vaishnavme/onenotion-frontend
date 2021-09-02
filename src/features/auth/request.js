import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../api';

export const loginUserWithCredentials = createAsyncThunk(
    'auth/loginUserWithCredentials',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL}/user/login`, {
                email,
                password
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const signupUserWithCredentials = createAsyncThunk(
    'auth/signupUserWithCredentials',
    async ({ name, email, password }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL}/user/signup`, {
                name,
                email,
                password
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
