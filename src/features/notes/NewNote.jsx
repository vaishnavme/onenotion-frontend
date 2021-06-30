import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import { saveNewNote } from "./noteSlice";
import { EditorContainer, PreviewContainer } from "../../components";

export default function NewNote() {
    const [isPreviewVisible, setPreviewVisible] = useState();
    const [title, setTitle] = useState("" || "Untitled");
    const [article, setArticle] = useState("");
    
    const dispatch = useDispatch();

    const { noteId } = useParams();

    const newPostHandler = () => {
        const newNote = {
            id: "note78",
            label: "Test",
            isBookmarked: false,
            title: title,
            article: article
        }
        dispatch(saveNewNote(newNote));
    }

    const previewHandler = () => setPreviewVisible((prevState) => !prevState);

    const clearNote = () => {
        setTitle("");
        setArticle("");
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <div className="text-lg hidden md:block">{title.substring(0, 25) || "Untitled"}</div>
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
                        article={article}
                    />
                    :
                    <EditorContainer
                        title={title}
                        article={article}
                        setTitle={setTitle}
                        setArticle={setArticle}
                    />
                }
            </div>
        </div>
    )
}



