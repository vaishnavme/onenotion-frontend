import { Fragment } from "react";
import TextareaAutosize from 'react-autosize-textarea';
const marked = require("marked");

marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: function(code, lang) {
      const hljs = require('highlight.js');
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value;
    },
    pedantic: false,
    gfm: true,
    breaks: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    xhtml: false
  });

export const EditorContainer = ({title, article, setTitle, setArticle}) => {
    return (
        <Fragment>
            <TextareaAutosize
                className="p-2 text-3xl w-full font-bold rounded bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-transparent"
                placeholder="Untitled"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                />

            <TextareaAutosize
                value={article=== "" ? "" : article}
                className="my-3 p-1 bg-gray-50 w-full rounded focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-transparent"
                onChange={(e) => setArticle(e.target.value)}
            />         
        </Fragment>
    )
}


export const PreviewContainer = ({title,article}) => {
    return (
        <Fragment>
            <div className="text-3xl font-bold">{title}</div>
            <div className="my-3" dangerouslySetInnerHTML = {{__html: marked(article)}}></div>
        </Fragment>
    )
}