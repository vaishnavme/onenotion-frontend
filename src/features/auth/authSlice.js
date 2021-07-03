import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { logInUser, signUpUser } from "../../services/auth";

export const logInUserWithCredentials = createAsyncThunk(
    "auth/logInUser",
    async({email, password}) => {
        const {data: {success, user, token, message}} = await logInUser({email, password})
        if(!success) {
            throw new Error(message);
        }
        return {user, token} 
    }
)

export const signUpUserWithCredentials = createAsyncThunk(
    "auth/signUpUser",
    async({name, email, password}) => {
        const {data: {success, user, token, message}} = await signUpUser({name, email, password})
        if(!success) {
            throw new Error(message);
        }
        return {user, token}
    }
)

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
        [logInUserWithCredentials.pending]: (state) => {
            state.status = "loading"
        },
        [logInUserWithCredentials.fulfilled]: (state, action) => {
            const {user, token} = action.payload;
            console.log(user);
            state.authUser = user;
            state.authUserToken = token;
            state.status = "tokenReceived";
            state.isAuthenticated = true;
            localStorage.setItem("isAuthenticated", JSON.stringify(true));
            localStorage.setItem("authUser", JSON.stringify(user));
            localStorage.setItem("authUserToken", JSON.stringify(token));
            axios.defaults.headers.common["Authorization"] = token
        },
        [logInUserWithCredentials.rejected]: (state) => {
            state.status = "error"
        },

        [signUpUserWithCredentials.pending]: (state) => {
            state.status = "loading"
        },
        [signUpUserWithCredentials.fulfilled]: (state, action) => {
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
        [signUpUserWithCredentials.rejected]: (state) => {
            state.status = "error"
        }
    }
})

export const { logOutUser, resetStatus } = authSlice.actions;
export default authSlice.reducer;