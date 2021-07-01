import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { logInUser } from "../../services/auth";

export const logInUserWithCredentials = createAsyncThunk(
    "auth/logInUser",
    async({email, password}) => {
        const {data: {success, user, token, message}} = await logInUser({email, password})
        if(!success) {
            throw new Error(message);
        }
        console.log("slice ", success, user, token)
        return {user, token, success}
        
    }
)

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        authUserToken: "",
        authUser: "",
        status: "",
        isAuthenticated: false,
    },
    reducers: {
        logOutUser: () => {
            console.log("logoutuser: ")
        }
    },
    extraReducers: {
        [logInUserWithCredentials.pending]: (state) => {
            state.status = "loading"
        },
        [logInUserWithCredentials.fulfilled]: (state, action) => {
            const {user, token, success} = action.payload;
            state.authUser = user;
            state.authUserToken = token;
            state.status = success;
            localStorage.setItem("authUser", JSON.stringify(user));
            localStorage.setItem("authToken", JSON.stringify(token));
            localStorage.setItem("isAuthenticated", JSON.stringify(true));
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        },
        [logInUserWithCredentials.rejected]: (state) => {
            state.status = "error"
        }
    }
})

export const { logOutUser } = authSlice.actions;
export default authSlice.reducer;