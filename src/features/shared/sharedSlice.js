import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../api/api";

export const getSharedPages = createAsyncThunk(
    "shared/getSharedPages",
    async() => {
        try {
            const response = await axios.get(`${BASE_URL}/public/pages`);
            return response.data.sharedPages
        } catch(err) {
            console.log(err)
        }
    }
)

export const sharePage = createAsyncThunk(
    "shared/sharePage",
    async(pageId) => {
        try {
            const response = await axios.post(`${BASE_URL}/public/${pageId}`)
            return response.data.sharedPage.publicPage
        } catch(err) {
            console.log(err)
        }
    }
)

export const deleteSharedPage = createAsyncThunk(
    "shared/deleteSharedPage",
    async(pageId) => {
        try {
            const response = await axios.delete(`${BASE_URL}/public/${pageId}`);
            return response.data.pageId
        } catch(err) {
            console.log(err)
        }
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
            state.publicPage = action.payload;
            state.sharedStatus = "pageLoaded"
        },
        [getSharedPages.rejected]: (state) => {
            state.sharedStatus = "error"
        },

        [sharePage.pending]: (state) => {
            state.sharedStatus = "sharing"
        },
        [sharePage.fulfilled]: (state, action) => {
            state.publicPage.push(action.payload)
            state.sharedStatus = "shared"
        },
        [sharePage.rejected]: (state) => {
            state.sharedStatus = "error"
        },

        [deleteSharedPage.pending]: (state) => {
            state.sharedStatus = "removing"
        },
        [deleteSharedPage.fulfilled]: (state, action) => {
            const { payload } = action;
            state.publicPage.splice(
                state.publicPage.findIndex((page) => page._id === payload),1)
            state.sharedStatus = "Fulfilled"
        },
        [deleteSharedPage.rejected]: (state) => {
            state.sharedStatus = "error"
        }
    }
})

export default sharedSlice.reducer;