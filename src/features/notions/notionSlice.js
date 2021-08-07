import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../api/api";

export const getUserPages = createAsyncThunk("pages/getUserPages",
    async() => {
        try {
            const response = await axios.get(`${BASE_URL}/pages`)
            return response.data.pages
        }
        catch(error) {
            console.log(error)
        }
    }
)

export const saveUserPage = createAsyncThunk("pages/saveUserPage",
    async(page) => {
        try {
            const response = await axios.post(`${BASE_URL}/pages`, {page: page})
            return response.data.savedPage
        }
        catch(error) {
            console.log(error)
        }
    }
)

export const updateUserPage = createAsyncThunk("pages/updateUserPage",
    async(pageUpdate, pageId) => {
        try {
            const response = await axios.post(`${BASE_URL}/pages/${pageId}`, {pageUpdates: pageUpdate})
            return response.data.updated
        }
        catch(error) {
            console.log(error)
        }
    }
)

export const deleteUserPage = createAsyncThunk("pages/deleteUserPage",
    async(pageId) => {
        try {
            const response = await axios.delete(`${BASE_URL}/pages/${pageId}`);
            return response.data.pageId
        }
        catch(error) {
            console.log(error)
        }
    }
)

export const pageSlice = createSlice({
    name: "notions",
    initialState: {
        pageStatus: "idle",
        pages: [],
    },
    reducers: {},
    extraReducers: {
        [getUserPages.pending]: (state) => {
            state.pageStatus = "loading";
        },
        [getUserPages.fulfilled]: (state, action) => {
            const { payload } = action;
            state.pages = payload
            state.pageStatus = "pageLoaded"
        },
        [getUserPages.rejected]: (state) => {
            state.pageStatus = "error"
        },

        [saveUserPage.pending]: (state) => {
            state.pageStatus = "saving";
        },
        [saveUserPage.fulfilled]: (state, action) => {
            state.pages.push(action.payload)
            state.pageStatus = "saved"
        },
        [saveUserPage.rejected]: (state) => {
            state.pageStatus = "error"
        },

        [updateUserPage.pending]: (state) => {
            state.pageStatus = "updating";
        },
        [updateUserPage.fulfilled]: (state) => {
            state.pageStatus = "updated"
        },
        [updateUserPage.rejected]: (state) => {
            state.pageStatus = "error"
        },

        [deleteUserPage.pending]: (state) => {
            state.pageStatus = "deleting";
        },
        [deleteUserPage.fulfilled]: (state, action) => {
            const { payload } = action;
            state.pages.splice(
                state.pages.findIndex((page) => page._id === payload),1)
            state.pageStatus = "Fulfilled"
        },
        [deleteUserPage.rejected]: (state) => {
            state.pageStatus = "error"
        }
    }
})

export default pageSlice.reducer;