import { Fragment } from "react";
import TextareaAutosize from 'react-autosize-textarea';

export const EditorContainer = ({title, content, setTitle, setContent}) => {
    return (
        <Fragment>
            <TextareaAutosize
                className="p-2 text-3xl w-full font-bold rounded bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-transparent"
                placeholder="Untitled"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                />

            <TextareaAutosize
                value={content=== "" ? "" : content}
                placeholder="Write your thoughts..."
                className="my-3 p-1 bg-gray-50 w-full rounded focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-transparent"
                onChange={(e) => setContent(e.target.value)}
            />         
        </Fragment>
    )
}