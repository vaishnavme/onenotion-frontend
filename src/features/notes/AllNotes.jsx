import { useSelector } from "react-redux"

export default function AllNotes() {
    const allNotions = useSelector((state) => state.notion.notes)

    return (
        <div>
            <h1 className="text-2xl">Your Notes</h1>
            <ul>
                {
                    allNotions.map((note) => (
                        <li key={note.id}>
                            <div className="text-lg font-medium">{note.title}</div>
                            <p>{note.article}</p>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}