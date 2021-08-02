import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { saveUserPage, updateUserPage } from "../features/pages/pageSlice";
import { EditorContainer, PreviewContainer, getTimeandData, Loader } from "../components";
import { BASE_URL } from "../api/api";

export default function NewPage() {
    const { pageStatus } = useSelector((state) => state.page)
    const [isPreviewVisible, setPreviewVisible] = useState(false);
    const [isLoading, setLoading] = useState(false); 
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const { pageId } = useParams();

    useEffect(() => {
        if(pageId && location.pathname.includes('/edit-page')) {
            (async () => {
                try {
                    setLoading(true)
                    const {data: {page, success}} = await axios.get(`${BASE_URL}/pages/${pageId}`)
                    if(success) {
                        setTitle(page.title)
                        setContent(page.content)
                    }
                    setLoading(false)
                } catch (err) {
                    console.error(err)
                } finally {
                    setLoading(false)
                }
            })();
            setPreviewVisible(true)
        }
    },[location, pageId])

    const newPageHandler = () => {
        const page = {
            title: title || "Untitled",
            date: getTimeandData(),
            label: "General",
            isBookmark: true,
            content: content
        }
        if(pageId && location.pathname.includes('/edit-page')) {
            dispatch(updateUserPage({pageUpdate: page, pageId: pageId}))
            if(pageStatus === "updated") {
                navigate("/")
            }
        } else {
            dispatch(saveUserPage(page));
            if(pageStatus === "saved") {
                navigate("/")
            }
        }
    }

    const previewHandler = () => setPreviewVisible((prevState) => !prevState);

    const clearNote = () => {
        setTitle("");
        setContent("");
    }

    return (
        <div>
            {
            isLoading ? <Loader/>
        : 
        <div>
            <div className="flex justify-between items-center mb-6 flex-col md:flex-row">
                <div>
                    <div className="text-lg hidden md:block">{title.substring(0, 25) || "Untitled"}</div>
                </div>
    
                <div className="w-80 md:w-56">
                    <ul className="flex justify-between">
                        <li className="">
                            <button onClick={previewHandler} className="text-blue-600 bg-blue-50 py-1 px-2">
                                {isPreviewVisible ? "Edit" : "Preview"}
                            </button>
                        </li>
                        <li className="text-blue-600 bg-blue-50">
                            <button onClick={() => newPageHandler()} className="text-blue-600 bg-blue-50 py-1 px-2">
                                { (pageStatus === "saving" || pageStatus === "updating") 
                                ? <i className="animate-spin bx bx-loader-alt font-thin"></i>  
                                : "Save"}
                            </button>
                        </li>
                        <li className="text-blue-600 bg-blue-50">
                            <button onClick={() => clearNote()} className="text-blue-600 bg-blue-50 py-1 px-2">Clear</button>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="m-auto w-full max-w-3xl">
                {
                    isPreviewVisible ? 
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
        }
    </div>
    )
}



