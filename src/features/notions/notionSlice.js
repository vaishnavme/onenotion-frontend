import { createSlice } from '@reduxjs/toolkit';
import {
    getUserPages,
    saveUserPage,
    updateUserPage,
    deleteUserPage
} from './request';

export const pageSlice = createSlice({
    name: 'notion',
    initialState: {
        pageStatus: 'idle',
        notion: [],
        currentPage: null,
        error: null
    },
    reducers: {},
    extraReducers: {
        [getUserPages.pending]: (state) => {
            state.pageStatus = 'loading';
        },
        [getUserPages.fulfilled]: (state, action) => {
            const { pages } = action.payload;
            state.notion = pages;
            state.pageStatus = 'pageLoaded';
        },
        [getUserPages.rejected]: (state, action) => {
            state.pageStatus = 'error';
            state.error = action.payload;
        },

        [saveUserPage.pending]: (state) => {
            state.pageStatus = 'saving';
        },
        [saveUserPage.fulfilled]: (state, action) => {
            const { savedPage } = action.payload;
            state.notion.push(savedPage);
            state.currentPage = savedPage;
            state.pageStatus = 'saved';
        },
        [saveUserPage.rejected]: (state, action) => {
            state.pageStatus = 'error';
            state.error = action.payload;
        },

        [updateUserPage.pending]: (state) => {
            state.pageStatus = 'saving';
        },
        [updateUserPage.fulfilled]: (state) => {
            state.pageStatus = 'saved';
        },
        [updateUserPage.rejected]: (state, action) => {
            state.pageStatus = 'error';
            state.error = action.payload;
        },

        [deleteUserPage.pending]: (state) => {
            state.pageStatus = 'deleting';
        },
        [deleteUserPage.fulfilled]: (state, action) => {
            const { pageId } = action.payload;
            state.notion = state.notion.filter((page) => page._id !== pageId);
            state.pageStatus = 'Fulfilled';
        },
        [deleteUserPage.rejected]: (state, action) => {
            state.pageStatus = 'error';
            state.error = action.payload;
        }
    }
});

export default pageSlice.reducer;
