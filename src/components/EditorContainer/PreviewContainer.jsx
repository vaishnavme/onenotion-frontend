import TextareaAutosize from 'react-autosize-textarea';
import MarkdownIt from 'markdown-it';
import { Toolbar } from './Toolbar';
import styles from '../../css/Markdown.module.css';

const Markdown = MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    breaks: true,
    quotes: '“”‘’',
    highlight: function (code, lang) {
        const hljs = require('highlight.js');
        const language = hljs.getLanguage(lang) ? lang : 'plaintext';
        return hljs.highlight(code, { language }).value;
    }
});

export const PreviewContainer = ({
    title,
    setTitle,
    content,
    editorStatus,
    setEditorStatus
}) => {
    return (
        <div>
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
            <div
                className={`${styles.markdown} px-1 text-lg`}
                dangerouslySetInnerHTML={{ __html: Markdown.render(content) }}
            ></div>
        </div>
    );
};
