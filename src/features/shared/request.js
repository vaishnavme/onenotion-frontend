import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../api';

export const getSharedPages = createAsyncThunk(
    'shared/getSharedPages',
    async () => {
        try {
            const response = await axios.get(`${BASE_URL}/public/pages`);
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }
);

export const sharePage = createAsyncThunk(
    'shared/sharePage',
    async (pageId, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL}/public/${pageId}`);
            return response.data.sharedPage;
        } catch (error) {
            rejectWithValue(error.response.data);
        }
    }
);

export const deleteSharedPage = createAsyncThunk(
    'shared/deleteSharedPage',
    async (pageId, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`${BASE_URL}/public/${pageId}`);
            return response.data;
        } catch (error) {
            rejectWithValue(error.response.data);
        }
    }
);
