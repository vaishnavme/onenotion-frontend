// import styles from "../css/Markdown.module.css";
import MarkdownIt from 'markdown-it';


const Markdown = MarkdownIt({
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

export const PreviewContainer = ({title,content}) => {
    return (
        <div>
            <div className="text-3xl font-bold">{title}</div>
            <div className="my-3" dangerouslySetInnerHTML = {{__html: Markdown.render(content)}}></div>
        </div>
    )
}