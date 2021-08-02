import { createAsyncThunk } from "@reduxjs/toolkit"
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