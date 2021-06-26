import { useSelector } from "react-redux";

export default function AllNotes() {
    const allNotions = useSelector((state) => state.notion)

    return (
        <div>
            <h1 className="text-2xl">Your Notes</h1>
            <div className="notesGrid my-4">
                {
                    allNotions.notes.map((note) => (
                        <div 
                            className="bg-gray-800 rounded-md p-4 hover:shadow-lg transition-all duration-300 ease"
                            key={note.id}>
                            <div className="text-lg font-medium mb-2">{note.title}</div>
                            <div className="border-b-2 my-2"></div>
                            <p className="leading-relaxed">{note.article}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}