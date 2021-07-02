import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUserNotes } from "./noteSlice";
import { PreviewContainer } from "../../components";

export default function AllNotes() {
    const allNotions = useSelector((state) => state.notion)
    const dispatch = useDispatch();
    const { isAuthenticated, authUserToken } = useSelector((state) => state.auth);

    useEffect(() => {
        isAuthenticated && dispatch(getUserNotes(authUserToken))
    }, [])
    
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
                        <Link to={`/edit-page/${note._id}`} key={note._id}>
                            <div 
                                className="rounded-md p-4 hover:shadow-lg transition-all duration-300 ease border-2">
                                <div className="text-3xl font-bold my-3 note-title">{note.title}</div>
                                <div className="note-article">{note.content}</div>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}