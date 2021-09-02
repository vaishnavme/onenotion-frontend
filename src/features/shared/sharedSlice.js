import { createSlice } from '@reduxjs/toolkit';
import { getSharedPages, sharePage, deleteSharedPage } from './request';

// export const getSharedPages = createAsyncThunk(
//     'shared/getSharedPages',
//     async () => {
//         try {
//             const response = await axios.get(`${BASE_URL}/public/pages`);
//             return response.data.sharedPages;
//         } catch (err) {
//             console.log(err);
//         }
//     }
// );

// export const sharePage = createAsyncThunk(
//     'shared/sharePage',
//     async (pageId) => {
//         try {
//             const response = await axios.post(`${BASE_URL}/public/${pageId}`);
//             return response.data.sharedPage.publicPage;
//         } catch (err) {
//             console.log(err);
//         }
//     }
// );

// export const deleteSharedPage = createAsyncThunk(
//     'shared/deleteSharedPage',
//     async (pageId) => {
//         try {
//             const response = await axios.delete(`${BASE_URL}/public/${pageId}`);
//             return response.data.pageId;
//         } catch (err) {
//             console.log(err);
//         }
//     }
// );

export const sharedSlice = createSlice({
    name: 'shared',
    initialState: {
        sharedStatus: 'idle',
        publicPage: [],
        error: null
    },
    reducers: {},
    extraReducers: {
        [getSharedPages.pending]: (state) => {
            state.sharedStatus = 'loading';
        },
        [getSharedPages.fulfilled]: (state, action) => {
            const { sharedPages } = action.payload;
            state.publicPage = sharedPages;
            state.sharedStatus = 'pageLoaded';
        },
        [getSharedPages.rejected]: (state, action) => {
            state.sharedStatus = 'error';
            state.error = action.payload;
        },

        [sharePage.pending]: (state) => {
            state.sharedStatus = 'sharing';
        },
        [sharePage.fulfilled]: (state, action) => {
            const { publicPage } = action.payload;
            state.publicPage.push(publicPage);
            state.sharedStatus = 'shared';
        },
        [sharePage.rejected]: (state, action) => {
            state.sharedStatus = 'error';
            state.error = action.payload;
        },

        [deleteSharedPage.pending]: (state) => {
            state.sharedStatus = 'removing';
        },
        [deleteSharedPage.fulfilled]: (state, action) => {
            const { payload } = action;
            state.publicPage.splice(
                state.publicPage.findIndex((page) => page._id === payload),
                1
            );
            state.sharedStatus = 'Fulfilled';
        },
        [deleteSharedPage.rejected]: (state, action) => {
            state.sharedStatus = 'error';
            state.error = action.payload;
        }
    }
});

export default sharedSlice.reducer;
