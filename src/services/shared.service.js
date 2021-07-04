import axios from "axios";

export const getPublicPage = async() => {
    try {
        const response = await axios.get(`/public/pages`);
        return response.data.sharedPages
    } catch(err) {
        console.log(err)
    }
}

export const pagePublish = async(pageId) => {
    try {
        const response = await axios.post(`/public/${pageId}`)
        console.log("shae", response)
        return response.data.sharedPage.publicPage
    } catch(err) {
        console.log(err)
    }
}

export const deletePublish = async(pageId) => {
    try {
        const response = await axios.delete(`/public/${pageId}`)
        return response
    } catch(err) {
        console.log(err)
    }
}