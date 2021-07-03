import axios from "axios";

export const getPages = async() => {
    try {
        const response = await axios.get(`/pages`)
        return response
    } catch(err) {
        console.log(err)
    }
}

export const updatePage = async({pageUpdate, pageId}) => {
    try {
        const response = await axios.post(`/pages/${pageId}`, {
            pageUpdates: pageUpdate
        })
        return response
    } catch(err) {
        console.log(err)
    }
}

export const savePage = async(page) => {
    try {
        const response = await axios.post(`/pages`, {
            page: page
        })
        return response
    } catch(err) {
        console.log(err)
    }
}

export const deletePage = async(pageId) => {
    try {
        const response = await axios.delete(`/pages/${pageId}`)
        return response
    } catch(err) {
        console.log(err)
    }
}

// public page opearions
export const getPublicPage = async() => {
    try {
        const response = await axios.get(`/public/pages`);
        console.log(response)
    } catch(err) {
        console.log(err)
    }
}

export const pagePublish = async(pageId) => {
    try {
        const response = await axios.post(`/public/${pageId}`)
        return response
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