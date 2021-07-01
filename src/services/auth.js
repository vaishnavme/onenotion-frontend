import axios from "axios";

export const logInUser = async({email, password}) => {
    const response = await axios.post(`/user/login`, {
            email, 
            password
    });
    return response;
}

export const signUpUser = async ({name, email, password}) => {
    const response = await axios.post(`/user/signup`, {
        name, email, password
    })
    return response;
}