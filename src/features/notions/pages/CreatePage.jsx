import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from "axios";
import { EditorContainer, PreviewContainer,getTimeandData, ErrorToast } from "../../../components";
import { saveUserPage, updateUserPage } from "../notionSlice";
import { BASE_URL } from "../../../api/api";

export default function CreatePage() {
    const { pageStatus, currentPage } = useSelector(state => state.notion);
    const { authUserToken } = useSelector(state => state.auth);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [isPreviewEnable, setPreviewEnable] = useState(false);
    const [errorMessage, setErrorMessage] = useState("")

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { pageId } = useParams();

    const savePageHandler = () => {
        if(title === "" && content === "") return setErrorMessage("Cannot save empty page!");

        let page = {
            title: title || "Untitled",
            date: getTimeandData(),
            content: content
        }

        if(pageId && location.pathname.includes('/draft')) {
            dispatch(updateUserPage({pageUpdate: page, pageId: pageId}))
        } else {
            dispatch(saveUserPage(page))
        }
    }


    useEffect(() => {
        if(pageId && location.pathname.includes('/draft') && authUserToken) {
            (async () => {
                try {
                    const response = await axios.get(`${BASE_URL}/pages/${pageId}`)
                    setTitle(response.data.page.title)
                    setContent(response.data.page.content)
                } catch (err) {
                    console.error(err)
                    setErrorMessage(err)
                }
            })();
        } 
    },[location, pageId, authUserToken])

    useEffect(() => {
        if(currentPage !== null) {
            navigate(`/draft/${currentPage?._id}`)
            setTitle(currentPage.title)
            setContent(currentPage.content);
        }
        // eslint-disable-next-line
    }, [currentPage])

    return (    
        <div>
            <div className="flex items-center justify-between">
                <div>{getTimeandData()}</div>
                <div>
                    <button 
                        onClick={() => savePageHandler()}
                        className="text-gray-500 text-blue-500 border py-1 w-24 rounded border-blue-500 focus:outline-none hover:bg-blue-500 hover:text-white">
                        {
                            pageStatus === "saving" ?
                            <span className="flex item-center justify-center"><i className={`bx bx-loader-alt animate-spin text-xl mr-2`}></i> Saving</span>
                            :   <span className="flex item-center justify-center"><i className={`bx bx-cloud text-xl mr-2`}></i> Save</span>
                        }
                    </button>
                    <button 
                        onClick={() => setPreviewEnable(prevState => !prevState)}
                        className="text-gray-500 text-blue-500 border py-1 w-24 rounded border-blue-500 ml-4 focus:outline-none hover:bg-blue-500 hover:text-white">
                        {
                            isPreviewEnable === true ? 
                            <span className="flex item-center justify-center"><i className={`bx bx-edit-alt text-xl mr-1`}></i> Write</span>
                            :   <span className="flex item-center justify-center"><i className={`bx bx-bullseye text-xl mr-1`}></i> Preview</span>
                        }
                    </button>
                </div>
            </div>
            <div className="m-auto w-full max-w-3xl">
                <div className="mt-2">
                    {
                        isPreviewEnable ?
                            <PreviewContainer 
                                title={title}
                                content={content}
                            />
                        :
                        <EditorContainer
                            title={title}
                            content={content}
                            setTitle={setTitle}
                            setContent={setContent}
                        />
                    }
                </div>
            </div>
            {
                <ErrorToast 
                    setMessage={setErrorMessage}
                    message={errorMessage}
                />
            }
        </div>
    )
}



