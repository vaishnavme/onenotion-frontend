import { useState } from "react";
import EditorJS from '@editorjs/editorjs';
import { useDispatch } from "react-redux";
import { saveNewNote } from "./noteSlice";
import { DropdownMenu } from "../../components";

export default function NewNote() {
    const [title, setTitle] = useState("" || "Untitled");
    const [currentLabel, setCurrentLabel] = useState("No Label");
    const [article, setArticle] = useState("");

    const dispatch = useDispatch();

    const newPostHandler = () => {
        const newNote = {
            id: "note78",
            label: "Test",
            isBookmarked: false,
            title: title,
            article: article
        }
        console.log("new: ", newNote);
    }

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
                            <button onClick={() => newPostHandler()} className="py-1 px-2">Save</button>
                        </li>
                        <li className="mx-2 bg-gray-800 hover:bg-gray-700 rounded text-white">
                            <button onClick={() => clearNote()} className="py-1 px-2">Clear</button>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="m-auto w-full max-w-3xl">
                <div
                    className="p-2 text-3xl font-bold rounded bg-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-transparent"
                    contentEditable="plaintext-only"
                    suppressContentEditableWarning={true}
                    placeholder="Untitled"
                    onInputCapture={(e) => setTitle(e.target.innerText)}>
                        {title==="" ? "" : null}
                </div>

                <div className="my-4">
                    <DropdownMenu
                        currentLabel={currentLabel}
                        setCurrentLabel={setCurrentLabel}
                    />
                </div>

                <div
                    className="my-2 p-2 bg-gray-800 rounded focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-transparent"
                    contentEditable="plaintext-only"
                    suppressContentEditableWarning={true}
                    placeholder="Write your thoughts..."
                    onInputCapture={(e) => setArticle(e.target.innerText)}>
                        {article==="" ? "" : null}
                </div>
            </div>
        </div>
    )
}
