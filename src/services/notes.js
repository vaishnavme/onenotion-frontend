import axios from "axios";

export const getNote = async(authUserToken) => {
    try {
        const response = await axios.get(`/notes`, {
            headers: {
                "Authorization" : authUserToken
            }
        })
        return response
    } catch(err) {
        console.log(err)
    }
}
