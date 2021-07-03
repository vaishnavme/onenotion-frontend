import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPages, updatePage, savePage, deletePage } from "../../services/page.service";

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

export const noteSlice = createSlice({
    name: "pages",
    initialState: {
        pages: [],
        publicPages: [],
        pageStatus: "idle"
    },
    reducers: {},
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
        }
    }
})

export default noteSlice.reducer;