import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from "axios";
import { EditorContainer, PreviewContainer, getTimeandData, ErrorToast } from "../../../components";
import { saveUserPage, updateUserPage } from "../notionSlice";
import { BASE_URL } from "../../../api/api";

export default function CreatePage() {
    const { pageStatus, currentPage } = useSelector(state => state.notion);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [editorStatus, setEditorStatus] = useState("EDITOR");
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
        if(pageId && location.pathname.includes('/draft')) {
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
    },[location, pageId])

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
            <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-4">
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
                </div>
            </div>
            <div className="m-auto w-full max-w-4xl">
                <div>
                    {
                        editorStatus === "EDITOR" &&
                        <EditorContainer
                            title={title}
                            content={content}
                            setTitle={setTitle}
                            setContent={setContent}
                            editorStatus={editorStatus}
                            setEditorStatus={setEditorStatus}
                        />
                    }
                    {
                        editorStatus === "PREVIEW" &&
                        <PreviewContainer 
                            title={title}
                            setTitle={setTitle}
                            content={content}
                            editorStatus={editorStatus}
                            setEditorStatus={setEditorStatus}
                        />
                    }
                    {
                        editorStatus === "GUIDE" &&
                        <div>Guide</div>
                    }
                </div>
                {
                    <ErrorToast 
                        setMessage={setErrorMessage}
                        message={errorMessage}
                    />
                }
            </div>
        </div>
    )
}
