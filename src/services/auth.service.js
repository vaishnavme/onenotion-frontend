import axios from "axios";
import { BASE_URL } from "../api/api";

export const logInUser = async({email, password}) => {
    const response = await axios.post(`${BASE_URL}/user/login`, {
            email, 
            password
    });
    return response;
}

export const signUpUser = async ({name, email, password}) => {
    const response = await axios.post(`${BASE_URL}/user/signup`, {
        name, email, password
    })
    return response;
}