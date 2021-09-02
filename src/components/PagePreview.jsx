import MarkdownIt from 'markdown-it';
import styles from '../css/Markdown.module.css';

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

export const PagePreview = ({ title, content }) => {
    return (
        <div>
            <div className="text-4xl font-bold">{title}</div>
            <div
                className={`${styles.markdown} px-1 text-lg`}
                dangerouslySetInnerHTML={{ __html: Markdown.render(content) }}
            ></div>
        </div>
    );
};
