import axios from "axios";
import { BASE_URL } from "../api/api";
import { successToast, successRemoveToast, errorToast } from "../components"

export const getPages = async() => {
    try {
        const response = await axios.get(`${BASE_URL}/pages`)
        return response.data.pages
    } catch(err) {
        errorToast("Error Ocuured. Please Try again after sometime.😥")
        console.log(err)
    }
}

export const updatePage = async({pageUpdate, pageId}) => {
    try {
        const {data: {success, updated}} = await axios.post(`${BASE_URL}/pages/${pageId}`, {
            pageUpdates: pageUpdate
        })
        if(success) {
            successToast("Page Updated Successfully 😄")
            return updated
        }
    } catch(err) {
        errorToast("Error Ocuured. Please Try again after sometime.😥")
        console.log(err)
    }
}

export const savePage = async(page) => {
    try {
        const {data: {success, savedPage}} = await axios.post(`${BASE_URL}/pages`, {
            page: page
        })
        if(success) {
            successToast("Page Updated Successfully 😄")
            return savedPage
        }
    } catch(err) {
        errorToast("Error Ocuured. Please Try again after sometime.😥")
        console.log(err)
    }
}

export const deletePage = async(pageId) => {
    try {
        const {data: {success, message}} = await axios.delete(`${BASE_URL}/pages/${pageId}`)
        if(success) {
            successRemoveToast("Page Deleted!")
            return message
        }
        
    } catch(err) {
        errorToast("Error Ocuured. Please Try again after sometime.😥")
        console.log(err)
    }
}
