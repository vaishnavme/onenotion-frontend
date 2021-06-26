import { useSelector } from "react-redux";

export default function AllNotes() {
    const allNotions = useSelector((state) => state.notion)

    return (
        <div>
            <div className="md:flex md:justify-between md:items-center">
                <h1 className="text-2xl">Your Notes</h1>
                <div className="my-4 flex md:justify-between md:items-center m-auto">
                    <input className="block w-10/12 md:w-96 p-3 bg-gray-700 mr-2 md:m-auto rounded md:rounded-l-md" type="text" placeholder="Search"/>
                    <button className="flex items-center px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded md:rounded-r-md text-white">
                        <span className="hidden md:block p-1">Filter</span> <i className=" md:ml-2 text-xl bx bx-filter-alt"></i>
                    </button>
                </div>
            </div>
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