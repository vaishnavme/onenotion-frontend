import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { PreviewContainer, Loader, ErrorToast } from "../../../components"
import { BASE_URL } from "../../../api/api"

export default function Page() {
    const [pageData, setPageData] = useState(null);
    const [errorMessage, setErrorMessage] = useState("")
    const [isLoading, setLoading] = useState(false);
    const { pageId } = useParams();
    
    useEffect(() => {
        if(pageData === null) {
            (async () => {
                try {
                    setLoading(true)
                    const response = await axios.get(`${BASE_URL}/public/shared/${pageId}`)
                        setPageData(response.data.sharedPage.publicPage)
                        setLoading(false)
                } catch (err) {
                    console.error(err)
                    setErrorMessage(err)
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
            {
                pageData &&
                    <>
                        <div className="text-sm font-medium my-3">{pageData?.date}</div>
                        <PreviewContainer 
                            title={pageData.title}
                            content={pageData.content}
                        />
                    </>
            }

            <ErrorToast 
                message={errorMessage}
                setMessage={setErrorMessage}
            />
        </div>
    )
}



