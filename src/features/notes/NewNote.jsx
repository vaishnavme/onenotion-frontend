import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { saveNewNote, updateUserPage } from "./noteSlice";
import { EditorContainer, PreviewContainer, getTimeandData } from "../../components";
const marked = require("marked");

export default function NewNote() {
    const [isPreviewVisible, setPreviewVisible] = useState();
    const { authUserToken } = useSelector((state) => state.auth);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const dispatch = useDispatch();
    const location = useLocation();
    const { pageId } = useParams();

    useEffect(() => {
        if(pageId && location.pathname.includes('/edit-page')) {
            (async () => {
                try {
                    const {data: {page, success}} = await axios.get(`/pages/${pageId}`)
                    if(success) {
                        setTitle(page.title)
                        setContent(page.content)
                    }
                } catch (err) {
                    console.error(err)
                } 
            })();
        }
    },[])

    const newPostHandler = () => {
        const page = {
            title: title,
            date: getTimeandData(),
            label: "General",
            isBookmark: true,
            content: content
        }
        if(pageId && location.pathname.includes('/edit-page')) {
            console.log(pageId)
            dispatch(updateUserPage({pageUpdate: page, pageId: pageId}))
        }
        //dispatch(saveNewNote(newNote));
    }

    const previewHandler = () => setPreviewVisible((prevState) => !prevState);

    const clearNote = () => {
        setTitle("");
        setContent("");
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <div className="text-lg hidden md:block">{title.substring(0, 25) || "Untitled"}</div>
                </div>
                
                <div>
                    <span className="text-sm font-medium">{getTimeandData()}</span>
                </div>
    
                <div>
                    <ul className="flex">
                        <li className="mx-2 bg-gray-800 hover:bg-gray-700 rounded text-white">
                            <button onClick={previewHandler} className="py-1 px-2">Preview</button>
                        </li>
                        <li className="mx-2 bg-gray-800 hover:bg-gray-700 rounded text-white">
                            <button onClick={() => newPostHandler()} className="py-1 px-2">Save</button>
                        </li>
                        <li className="mx-2 bg-gray-800 hover:bg-gray-700 rounded text-white">
                            <button onClick={() => clearNote()} className="py-1 px-2">Clear</button>
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
    )
}



