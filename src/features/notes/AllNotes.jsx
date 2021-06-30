import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { PreviewContainer } from "../../components";

export default function AllNotes() {
    const allNotions = useSelector((state) => state.notion)

    return (
        <div>
            <div className="md:flex md:justify-between md:items-center">
                <h1 className="text-2xl">Your Notes</h1>
                <div className="my-4 flex md:justify-between md:items-center m-auto">
                    <input className="block w-10/12 md:w-96 p-3 bg-gray-50 mr-2 md:m-auto rounded md:rounded-l-md" type="text" placeholder="Search"/>
                    <button className="flex items-center px-3 py-2 bg-gray-200 hover:bg-gray-50 rounded md:rounded-r-md">
                        <span className="hidden md:block p-1">Filter</span> <i className=" md:ml-2 text-xl bx bx-filter-alt"></i>
                    </button>
                </div>
            </div>
            <div className="notesGrid my-4">
                {
                    allNotions.notes.map((note) => (
                        <Link to={`/edit-page/${note.id}`} key={note.id}>
                            <div 
                                className="rounded-md p-4 hover:shadow-lg transition-all duration-300 ease border-2 md:border-0">
                                <PreviewContainer title={note.title} article={note.article}/>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}