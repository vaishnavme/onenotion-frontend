import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPages, updatePage, savePage, deletePage,
    getPublicPage, pagePublish, deletePublish } 
from "../../services/page.service";

// pages operations
export const getUserPages = createAsyncThunk(
    "pages/getPages",
    async() => {
        const {data: {pages}} = await getPages();
        return pages
    }
)

export const updateUserPage = createAsyncThunk(
    "pages/updatePage",
    async(pageUpdate, pageId) => {
        const data = await updatePage(pageUpdate, pageId);
    }
)

export const saveUserPage = createAsyncThunk(
    "pages/savePage",
    async(page) => {
        const {data: {success}} = await savePage(page);
        if(success) {
            success("Page Saved")
        }
    }
)

export const deleteUserPage = createAsyncThunk(
    "pages/deletePage",
    async(pageId) => {
        const {data: {success}} = await deletePage(pageId);
       console.log("data", success)
    }
)

// public page operations
export const getPublicPageList = createAsyncThunk(
    "pages/getPublicPage",
    async() => {
        const {data: {success, message, sharedPages}} = await getPublicPage();
        console.log({success, message});
        return sharedPages
    }
)

export const makePageShare = createAsyncThunk(
    "pages/pagePublish",
    async(pageId) => {
        const {data: {success, message}} = await pagePublish(pageId);
        console.log({success, message});
    }
)

export const deletePageShared = createAsyncThunk(
    "pages/pagePublish",
    async(pageId) => {
        const {data: {success, message}} = await deletePublish(pageId);
        console.log({success, message});
        }
)

export const noteSlice = createSlice({
    name: "pages",
    initialState: {
        pages: [],
        publicPages: [],
        pageStatus: "idle"
    },
    reducers: {
        saveNewNote: (state, action) => {
            state.notes.push(action.payload);
        }
    },
    extraReducers: {
        [getUserPages.pending]: (state) => {
            state.pageStatus = "loading"
        },
        [getUserPages.fulfilled]: (state, action) => {
            state.pages = (action.payload);
            state.pageStatus = "pageLoaded"
        },
        [getUserPages.rejected]: (state) => {
            state.pageStatus = "error"
        },
        [getPublicPageList.pending]: (state) => {
            state.pageStatus = "loading"
        },
        [getPublicPageList.fulfilled]: (state, action) => {
            state.publicPages = (action.payload);
            state.pageStatus = "pageLoaded"
        },
        [getPublicPageList.rejected]: (state) => {
            state.pageStatus = "error"
        },
    }
})

export const { saveNewNote } = noteSlice.actions;
export default noteSlice.reducer;