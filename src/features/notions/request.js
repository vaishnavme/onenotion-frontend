import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../api';

export const getUserPages = createAsyncThunk(
    'notion/getUserPages',
    async () => {
        try {
            const response = await axios.get(`${BASE_URL}/pages`);
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }
);

export const saveUserPage = createAsyncThunk(
    'notion/saveUserPage',
    async (page, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL}/pages`, {
                page: page
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateUserPage = createAsyncThunk(
    'notion/updateUserPage',
    async ({ pageUpdate, pageId }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL}/pages/${pageId}`, {
                pageUpdates: pageUpdate
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteUserPage = createAsyncThunk(
    'notion/deleteUserPage',
    async (pageId, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`${BASE_URL}/pages/${pageId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
