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
    console.log(pageUpdate);
    console.log(pageId)
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
    console.log(page);
    try {
        const response = await axios.post(`/pages`, {
            page: page
        })
        return response
    } catch(err) {
        console.log(err)
    }
}