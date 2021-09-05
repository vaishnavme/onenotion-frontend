import { useEffect, useState } from 'react';
import MarkdownIt from 'markdown-it';
import { Toolbar } from '..';
import guidePath from './Guide.md';
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

export const GuideContainer = ({ editorStatus, setEditorStatus }) => {
    const [guideText, setGuideText] = useState('');

    useEffect(() => {
        fetch(guidePath)
            .then((data) => data.text())
            .then((md) => setGuideText(md));
    });
    return (
        <div>
            <h1 className="text-4xl w-full font-medium rounded focus:outline-none focus:border-transparent px-1 mb-10">
                Guide
            </h1>
            <Toolbar
                editorStatus={editorStatus}
                setEditorStatus={setEditorStatus}
            />
            <div
                className={`${styles.markdown} px-1 text-lg`}
                dangerouslySetInnerHTML={{ __html: Markdown.render(guideText) }}
            ></div>
        </div>
    );
};
