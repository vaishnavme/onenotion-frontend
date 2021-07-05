import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { PreviewContainer } from "../../components"
import { BASE_URL } from "../../api/api";

export default function Page() {
    const [pageData, setPageData] = useState("")
    const { pageId } = useParams();

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get(`${BASE_URL}/public/shared/${pageId}`)
                setPageData(data.sharedPage.publicPage)
            } catch (err) {
                console.error(err)
            }
        })();
        // eslint-disable-next-line 
    },[pageId]);
    
    return (
        <div className="m-auto w-full max-w-3xl my-4">
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



