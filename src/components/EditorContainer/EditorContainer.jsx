import { Fragment } from "react";
import TextareaAutosize from 'react-autosize-textarea';
import { Toolbar } from "./Toolbar";

export const EditorContainer = ({title, content, setTitle, setContent, editorStatus, setEditorStatus}) => {
    return (
        <Fragment>
            <TextareaAutosize
                className="text-4xl w-full font-bold rounded focus:outline-none focus:border-transparent px-1"
                placeholder="Title..."
                maxLength={150}
                rows={2}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                />
            <Toolbar
                editorStatus={editorStatus}
                setEditorStatus={setEditorStatus}
            />
            <TextareaAutosize
                value={content=== "" ? "" : content}
                placeholder="Write your thoughts..."
                className="w-full text-lg rounded focus:outline-none focus:border-transparent my-4 px-1"
                onChange={(e) => setContent(e.target.value)}
            />         
        </Fragment>
    )
}