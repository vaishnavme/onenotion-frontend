import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useParams } from "react-router";
import { PreviewContainer } from "../../components"
import { BASE_URL } from "../../api/api";

export const Page = ({authUserToken}) => {
    const [pageData, setPageData] = useState("")
    const { pageId } = useParams();
    console.log(authUserToken)

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get(`${BASE_URL}/public/shared/${pageId}`,{
                     'headers': { 'Authorization': authUserToken }
                })
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



