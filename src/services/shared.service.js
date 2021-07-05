import axios from "axios";
import { BASE_URL } from "../api/api";

export const getPublicPage = async() => {
    try {
        const response = await axios.get(`${BASE_URL}/public/pages`);
        return response.data.sharedPages
    } catch(err) {
        console.log(err)
    }
}

export const pagePublish = async(pageId) => {
    try {
        const response = await axios.post(`${BASE_URL}/public/${pageId}`)
        return response.data.sharedPage.publicPage
    } catch(err) {
        console.log(err)
    }
}

export const deletePublish = async(pageId) => {
    try {
        const response = await axios.delete(`${BASE_URL}/public/${pageId}`)
        return response
    } catch(err) {
        console.log(err)
    }
}