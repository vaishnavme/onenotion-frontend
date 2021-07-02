import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getNote } from "../../services/notes";

export const getUserNotes = createAsyncThunk(
    "notes/getNote",
    async() => {
        const {data: {pages}} = await getNote();
        return pages
    }
)

export const noteSlice = createSlice({
    name: "notes",
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
        [getUserNotes.pending]: (state) => {
            state.status = "loading"
        },
        [getUserNotes.fulfilled]: (state, action) => {
            state.notes = (action.payload);
        },
        [getUserNotes.rejected]: (state) => {
            state.status = "error"
        }
    }
})

export const { saveNewNote } = noteSlice.actions;
export default noteSlice.reducer;