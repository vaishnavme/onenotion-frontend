import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPublicPage, pagePublish, deletePublish } from "../../services/shared.service";

export const getSharedPages = createAsyncThunk(
    "pages/getPublicPage",
    async() => {
        const {data: {success, message, sharedPages}} = await getPublicPage();
        console.log({success, message});
        return sharedPages
    }
)

export const sharePage = createAsyncThunk(
    "pages/pagePublish",
    async(pageId) => {
        const {data: {success, message}} = await pagePublish(pageId);
        console.log({success, message});
    }
)

export const deleteSharedPage = createAsyncThunk(
    "pages/pagePublish",
    async(pageId) => {
        const {data: {success, message}} = await deletePublish(pageId);
        console.log({success, message});
        }
)


export const sharedSlice = createSlice({
    name: "shared",
    initialState: {
        publicPages: [],
        sharedStatus: "idle"
    },
    extraReducers: {
        [getSharedPages.pending]: (state) => {
            state.sharedStatus = "loading"
        },
        [getSharedPages.fulfilled]: (state, action) => {
            state.publicPages = (action.payload);
            state.sharedStatus = "pageLoaded"
        },
        [getSharedPages.rejected]: (state) => {
            state.sharedStatus = "error"
        },
    }
})