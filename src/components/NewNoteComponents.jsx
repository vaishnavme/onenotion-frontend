import { Fragment } from "react";
import TextareaAutosize from 'react-autosize-textarea';

const MarkdownIt = require('markdown-it')({
    html: true,
    linkify: true,
    typographer: true,
    breaks: true,
    quotes: '“”‘’',
    highlight: function(code, lang) {
        const hljs = require('highlight.js');
        const language = hljs.getLanguage(lang) ? lang : 'plaintext';
        return hljs.highlight(code, { language }).value;
    },
});

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
                className="my-3 p-1 bg-gray-50 w-full rounded focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-transparent"
                onChange={(e) => setContent(e.target.value)}
            />         
        </Fragment>
    )
}

export const PreviewContainer = ({title,content}) => {
    return (
        <div className="previewContainer">
            <div className="text-3xl font-bold">{title}</div>
            <div className="my-3" dangerouslySetInnerHTML = {{__html: MarkdownIt.render(content)}}></div>
        </div>
    )
}