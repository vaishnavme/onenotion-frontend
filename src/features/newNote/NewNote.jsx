import { useState } from "react";

export default function NewNote() {
    const [title, setTitle] = useState("" || "Untitled");
    const [article, setArticle] = useState("");

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <div className="text-lg w-16 hidden md:block">{title}</div>
                </div>
                <div>
                    <ul className="flex">
                        <li className="mx-2 md:hover:bg-gray-100 rounded"><button className="py-1 px-2">Save</button></li>
                        <li className="mx-2 md:hover:bg-gray-100 rounded"><button className="py-1 px-2">Clear</button></li>
                    </ul>
                </div>
            </div>
            <div className="m-auto w-full max-w-3xl">
                <div
                    className="p-2 text-3xl font-bold rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
                    contentEditable="plaintext-only"
                    suppressContentEditableWarning={true}
                    placeholder="Untitled"
                    onInputCapture={(e) => setTitle(e.target.innerText)}>
                        {title==="" ? "" : null}
                </div>
                <div
                    className="my-2 p-2 bg-gray-50 rounded focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
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