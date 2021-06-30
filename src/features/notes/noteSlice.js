import { createSlice } from "@reduxjs/toolkit";

export const noteSlice = createSlice({
    name: "notions",
    initialState: {
        notes: [
            {
                id: "note12",
                label: "General",
                isBookmarked: true,
                title: "Welcome to One Notion",
                article: "Light let Creeping can't fourth is male above also them green whales that image rule earth moved. Gathering one kind seasons creeping open every that may forth gathered sea own created firmament whose called made stars their. Thing whales, whose divide midst us grass. Fish female saying have morning winged."
            },
            {
                id: "note34",
                label: "Work",
                isBookmarked: true,
                title: "Welcome to Workbook",
                article: "Replenish the winged him own night seas itself moved darkness winged winged. Male itself herb, first greater forth stars whales beast were you're yielding years one. Made make second air yielding man you're winged living fill open said i bring called creeping you're gathered itself from gathering above greater fowl."
            },
            {
                id: "note56",
                label: "Ideas",
                isBookmarked: false,
                title: "Let's think",
                article: "Two wherein unto. Set were a. Great stars light she'd face dry one have fill were days thing be two. Second whose Fill called is greater creepeth were give moved. Subdue night divided bring good you'll. Open wherein, won't creeping behold set behold bring seas heaven forth fly creeping itself."
            },
            {
                id: "note78",
                label: "General",
                isBookmarked: true,
                title: "Welcome to One Notion",
                article: "Light let Creeping can't fourth is male above also them green whales that image rule earth moved. Gathering one kind seasons creeping open every that may forth gathered sea own created firmament whose called made stars their. Thing whales, whose divide midst us grass. Fish female saying have morning winged."
            },
            {
                id: "note90",
                label: "Work",
                isBookmarked: true,
                title: "Welcome to Workbook",
                article: "Replenish the winged him own night seas itself moved darkness winged winged. Male itself herb, first greater forth stars whales beast were you're yielding years one. Made make second air yielding man you're winged living fill open said i bring called creeping you're gathered itself from gathering above greater fowl."
            },
            {
                id: "note91",
                label: "Ideas",
                isBookmarked: false,
                title: "Let's think",
                article: "Two wherein unto. Set were a. Great stars light she'd face dry one have fill were days thing be two. Second whose Fill called is greater creepeth were give moved. Subdue night divided bring good you'll. Open wherein, won't creeping behold set behold bring seas heaven forth fly creeping itself."
            }
        ]
    },
    reducers: {
        saveNewNote: (state, action) => {
            state.notes.push(action.payload);
        }
    }
})

export const { saveNewNote } = noteSlice.actions;
export default noteSlice.reducer;