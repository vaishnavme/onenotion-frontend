import styles from "../css/Markdown.module.css";

export const PreviewContainer = ({title,content}) => {
    return (
        <div className={`${styles.markdown}`}>
            <div className="text-3xl font-bold">{title}</div>
        </div>
    )
}