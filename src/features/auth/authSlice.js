import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../api/api";

export const loginUser = createAsyncThunk("auth/loginUser", 
    async({email, password}) => {
        try {
            const response = await axios.post(`${BASE_URL}/user/login`,{email, password});
            return response.data;
        }
        catch(error) {
            console.log(error)
        }
})

export const signupUser = createAsyncThunk("auth/signupUser",
    async({name, email, password}) => {
        try {
            const response = await axios.post({name, email, password});
            return response.data
        }
        catch(error) {
            console.log(error)
        }
})

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
        },
        [signupUser.rejected]: (state) => {
            state.status = "error"
        }
    }
})

export const { logOutUser, resetStatus } = authSlice.actions;
export default authSlice.reducer;