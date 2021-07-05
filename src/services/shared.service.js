import axios from "axios";
import { BASE_URL } from "../api/api";
import { successToast, successRemoveToast, errorToast } from "../components"

export const getPublicPage = async() => {
    try {
        const response = await axios.get(`${BASE_URL}/public/pages`);
        return response.data.sharedPages
    } catch(err) {
        errorToast("Error Ocuured. Please Try again after sometime.😥")
        console.log(err)
    }
}

export const pagePublish = async(pageId) => {
    try {
        const {data: {success, sharedPage}} = await axios.post(`${BASE_URL}/public/${pageId}`)
        if(success) {
            successToast("Page is now public. Get link from Shared section. 😄")
            return sharedPage.publicPage
        }
    } catch(err) {
        errorToast("Error Ocuured. Please Try again after sometime.😥")
        console.log(err)
    }
}

export const deletePublish = async(pageId) => {
    try {
        const {data: {success}} = await axios.delete(`${BASE_URL}/public/${pageId}`)
        if(success) {
            successRemoveToast("Page is Private")
            return success
        }
    } catch(err) {
        errorToast("Error Ocuured. Please Try again after sometime.😥")
        console.log(err)
    }
}