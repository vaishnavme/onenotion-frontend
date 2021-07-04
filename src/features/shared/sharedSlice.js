import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPublicPage, pagePublish, deletePublish } from "../../services/shared.service";

export const getSharedPages = createAsyncThunk(
    "shared/getSharedPages",
    async() => {
        const sharedPages = await getPublicPage();
        return sharedPages
    }
)

export const sharePage = createAsyncThunk(
    "shared/sharePage",
    async(pageId) => {
        const data = await pagePublish(pageId);
        return data
    }
)

export const deleteSharedPage = createAsyncThunk(
    "shared/deleteSharedPage",
    async(pageId) => {
        // eslint-disable-next-line
        const data = await deletePublish(pageId);
        return pageId
    }
)


export const sharedSlice = createSlice({
    name: "shared",
    initialState: {
        sharedStatus: "idle",
        publicPage: [],
    },
    reducers: {},
    extraReducers: {
        [getSharedPages.pending]: (state) => {
            state.sharedStatus = "loading"
        },
        [getSharedPages.fulfilled]: (state, action) => {
            const { payload } = action;
            state.publicPage = payload;
            state.sharedStatus = "pageLoaded"
        },
        [getSharedPages.rejected]: (state) => {
            state.sharedStatus = "error"
        },

        [sharePage.pending]: (state) => {
            state.sharedPages = "loading"
        },
        [sharePage.fulfilled]: (state, action) => {
            state.publicPage.push(action.payload)
            state.sharedStatus = "pageLoaded"
        },
        [sharePage.rejected]: (state) => {
            state.sharedPages = "error"
        },

        [deleteSharedPage.pending]: (state) => {
            state.sharedPages = "loading"
        },
        [deleteSharedPage.fulfilled]: (state, action) => {
            const { payload } = action;
            console.log(state.sharedPages)
            state.publicPage.splice(
                state.publicPage.findIndex((page) => page._id === payload),1)
                state.sharedStatus = "pageLoaded"
        },
        [deleteSharedPage.rejected]: (state) => {
            state.sharedPages = "error"
        }
    }
})

export default sharedSlice.reducer;