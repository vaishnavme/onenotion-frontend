import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { PreviewContainer, Loader } from "../../components"
import { BASE_URL } from "../../api/api";

export default function Page() {
    const [pageData, setPageData] = useState("");
    const [isLoading, setLoading] = useState(false);
    const { pageId } = useParams();
    
    useEffect(() => {
        if(pageData.length === 0) {
            (async () => {
                try {
                    setLoading(true)
                    const { data } = await axios.get(`${BASE_URL}/public/shared/${pageId}`)
                    setPageData(data.sharedPage.publicPage)
                    setLoading(false)
                } catch (err) {
                    console.error(err)
                } finally {
                    setLoading(false)
                }
            })();
        }
        // eslint-disable-next-line 
    },[pageId]);
    
    return (
        <div className="m-auto w-full max-w-3xl my-4 p-4">
            {isLoading && <Loader/>}
            <div className="text-sm font-medium my-3">{pageData.date}</div>
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



