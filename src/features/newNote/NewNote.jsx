export default function NewNote() {

    return (
        <div className="m-auto w-full max-w-3xl">
            <input 
                className="p-2 text-2xl font-semibold w-full rounded bg-gray-50"
                type="text" 
                placeholder="Title"
            />
            
            <div
                className="my-2 p-2 bg-gray-50 rounded"
                contentEditable={true}
                suppressContentEditableWarning={true}
                placeholder="Write your thoughts..."
            ></div>
        </div>
    )
}