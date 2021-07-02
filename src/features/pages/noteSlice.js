import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPages, updatePage, savePage, deletePage } from "../../services/notes";

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
        const data = await savePage(page);
    }
)

export const deleteUserPage = createAsyncThunk(
    "pages/deletePage",
    async(pageId) => {
        const {data: {success, message}} = await deletePage(pageId);
        console.log(success)
    }
)

export const noteSlice = createSlice({
    name: "pages",
    initialState: {
        pages: [],
        status: "idle"
    },
    reducers: {
        saveNewNote: (state, action) => {
            state.notes.push(action.payload);
        }
    },
    extraReducers: {
        [getUserPages.pending]: (state) => {
            state.status = "loading"
        },
        [getUserPages.fulfilled]: (state, action) => {
            state.pages = (action.payload);
        },
        [getUserPages.rejected]: (state) => {
            state.status = "error"
        }
    }
})

export const { saveNewNote } = noteSlice.actions;
export default noteSlice.reducer;