import { PreviewContainer } from "."

export const Page = ({title, content}) => {
    return (
        <div>
            <PreviewContainer
            title={title}
            content={content}
            />
        </div>
    )
}