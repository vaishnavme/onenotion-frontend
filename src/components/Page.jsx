import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useParams } from "react-router";
import { PreviewContainer } from "."

export const Page = () => {
    const { status, authUserToken } = useSelector((state) => state.auth);
    const [pageData, setPageData] = useState("")
    const { pageId } = useParams();

    useEffect(() => {
        if(status === "tokenReceived") {
            axios.defaults.headers.common["Authorization"] = authUserToken;
        }
        (async () => {
            try {
                const { data } = await axios.get(`/public/shared/${pageId}`)
                setPageData(data.sharedPage.publicPage)
            } catch (err) {
                console.error(err)
            }
        })();
        // eslint-disable-next-line 
    },[pageId]);
    
    return (
        <div className="m-auto w-full max-w-3xl">
            <div className="text-sm font-medium text-center">{pageData.date}</div>
            {
                pageData &&
                <PreviewContainer 
                    title={pageData.title}
                    content={pageData.content}
                />
            }
        </div>
    )
}



