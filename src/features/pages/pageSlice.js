import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { deletePage, getPages, savePage, updatePage } from "../../services/page.service";

export const getUserPages = createAsyncThunk(
    "pages/getUserPages",
    async() => {
        const pages = await getPages();
        return pages
    }
)

export const saveUserPage = createAsyncThunk(
    "pages/saveUserPage",
    async(page) => {
        const savedPage = await savePage(page);
        return savedPage;
    }
)

export const updateUserPage = createAsyncThunk(
    "pages/updateUserPage",
    async(pageUpdate, pageId) => {
        const updated = await updatePage(pageUpdate, pageId);
        return updated
    }
)

export const deleteUserPage = createAsyncThunk(
    "pages/deleteUserPage",
    async(pageId) => {
        // eslint-disable-next-line
        const data = await deletePage(pageId);
        return pageId
    }
)

export const pageSlice = createSlice({
    name: "pages",
    initialState: {
        pageStatus: "idle",
        notion: [],
    },
    reducers: {},
    extraReducers: {
        [getUserPages.pending]: (state) => {
            state.pageStatus = "loading";
        },
        [getUserPages.fulfilled]: (state, action) => {
            const { payload } = action;
            state.notion = payload
            state.pageStatus = "pageLoaded"
        },
        [getUserPages.rejected]: (state) => {
            state.pageStatus = "error"
        },

        [saveUserPage.pending]: (state) => {
            state.pageStatus = "loading";
        },
        [saveUserPage.fulfilled]: (state, action) => {
            state.notion.push(action.payload)
            state.pageStatus = "pageLoaded"
        },
        [saveUserPage.rejected]: (state) => {
            state.pageStatus = "error"
        },

        [updateUserPage.pending]: (state) => {
            state.pageStatus = "loading";
        },
        [updateUserPage.fulfilled]: (state) => {
            state.pageStatus = "pageLoaded"
        },
        [updateUserPage.rejected]: (state) => {
            state.pageStatus = "error"
        },

        [deleteUserPage.pending]: (state) => {
            state.pageStatus = "loading";
        },
        [deleteUserPage.fulfilled]: (state, action) => {
            const { payload } = action;
            state.notion.splice(
                state.notion.findIndex((page) => page._id === payload),1)
        },
        [deleteUserPage.rejected]: (state) => {
            state.pageStatus = "error"
        }
    }
})

export default pageSlice.reducer;