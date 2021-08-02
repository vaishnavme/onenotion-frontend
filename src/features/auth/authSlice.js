import { createSlice } from "@reduxjs/toolkit";
import { loginUser, signupUser} from "./request";
import axios from "axios";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        authUserToken: JSON.parse(localStorage?.getItem("authUserToken")) || null,
        authUser: JSON.parse(localStorage?.getItem("authUser")) || null,
        isAuthenticated: JSON.parse(localStorage?.getItem("isAuthenticated")) || null,
        status: JSON.parse(localStorage?.getItem("authUserToken"))
                ? "tokenReceived"
                : "idle",
    },
    reducers: {
        logOutUser: () => {
            localStorage.removeItem("authUserToken");
            localStorage.removeItem("authUser");
            localStorage.removeItem("isAuthenticated");
            return {
                authUserToken: null,
                authUser: null,
                isAuthenticated: null,
                status: "idle"
            }
        },
        resetStatus: (state) => {
            state.status = "idle"
        }
    },
    extraReducers: {
        [loginUser.pending]: (state) => {
            state.status = "loading"
        },
        [loginUser.fulfilled]: (state, action) => {
            const {user, token} = action.payload;
            state.authUser = user;
            state.authUserToken = token;
            state.status = "tokenReceived";
            state.isAuthenticated = true;
            localStorage.setItem("isAuthenticated", JSON.stringify(true));
            localStorage.setItem("authUser", JSON.stringify(user));
            localStorage.setItem("authUserToken", JSON.stringify(token));
            axios.defaults.headers.common["Authorization"] = token
        },
        [loginUser.rejected]: (state) => {
            state.status = "error"
        },

        [signupUser.pending]: (state) => {
            state.status = "loading"
        },
        [signupUser.fulfilled]: (state, action) => {
            const {user, token} = action.payload;
            state.authUser = user;
            state.authUserToken = token;
            state.status = "tokenReceived";
            state.isAuthenticated = true;
            localStorage.setItem("authUser", JSON.stringify(user));
            localStorage.setItem("authUserToken", JSON.stringify(token));
            localStorage.setItem("isAuthenticated", JSON.stringify(true));
            axios.defaults.headers.common["Authorization"] = token
        },
        [signupUser.rejected]: (state) => {
            state.status = "error"
        }
    }
})

export const { logOutUser, resetStatus } = authSlice.actions;
export default authSlice.reducer;