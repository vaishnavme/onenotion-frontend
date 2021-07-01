import axios from "axios";

export const logInUser = async({email, password}) => {
    const response = await axios.post(`/user/login`, {
            email, 
            password
    });
    return response
}