import axios from "axios";
import { BASE_URL } from "../api/api";

export const getPages = async() => {
    try {
        const response = await axios.get(`${BASE_URL}/pages`)
        return response.data.pages
    } catch(err) {
        console.log(err)
    }
}

export const updatePage = async({pageUpdate, pageId}) => {
    try {
        const response = await axios.post(`${BASE_URL}/pages/${pageId}`, {
            pageUpdates: pageUpdate
        })
        return response.data.updated
    } catch(err) {
        console.log(err)
    }
}

export const savePage = async(page) => {
    try {
        const response = await axios.post(`${BASE_URL}/pages`, {
            page: page
        })
        return response.data.savedPage
    } catch(err) {
        console.log(err)
    }
}

export const deletePage = async(pageId) => {
    try {
        const response = await axios.delete(`${BASE_URL}/pages/${pageId}`)
        return response
    } catch(err) {
        console.log(err)
    }
}
