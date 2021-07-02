import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPages, updatePage, savePage } from "../../services/notes";

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
        const {data: {success, message}} = await updatePage(pageUpdate, pageId)
        console.log(success)
    }
)

export const saveUserPage = createAsyncThunk(
    "pages/savePage",
    async(page) => {
        const {data: {success, message}} = await savePage(page);
        console.log(success, message)
    }
)

export const noteSlice = createSlice({
    name: "pages",
    initialState: {
        notes: [],
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
            state.notes = (action.payload);
        },
        [getUserPages.rejected]: (state) => {
            state.status = "error"
        }
    }
})

export const { saveNewNote } = noteSlice.actions;
export default noteSlice.reducer;