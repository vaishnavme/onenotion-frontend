import styles from "../../css/Markdown.module.css";
import TextareaAutosize from 'react-autosize-textarea';
import MarkdownIt from 'markdown-it';
import { Toolbar } from "./Toolbar";

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

export const PreviewContainer = ({title, setTitle,content, editorStatus, setEditorStatus}) => {
    return (
        <div>
            <TextareaAutosize
                className="text-4xl w-full font-bold rounded focus:outline-none focus:border-transparent"
                placeholder="Title..."
                maxLength={150}
                rows={2}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                />
            <Toolbar editorStatus={editorStatus} setEditorStatus={setEditorStatus}/>
            <div className={`${styles.markdown}`} dangerouslySetInnerHTML = {{__html: Markdown.render(content)}}></div>
        </div>
    )
}