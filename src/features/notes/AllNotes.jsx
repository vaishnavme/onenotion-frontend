import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUserPages } from "./noteSlice";
import { Shorts } from "../../components";

export default function AllNotes() {
    const notionPages = useSelector((state) => state.notion.pages)

    const dispatch = useDispatch();
    const { isAuthenticated, authUserToken } = useSelector((state) => state.auth);

    useEffect(() => {
        isAuthenticated && dispatch(getUserPages(authUserToken))
    }, [isAuthenticated,dispatch,authUserToken])
    
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
                { notionPages &&
                    notionPages.map((page) => (
                        <Shorts page={page}/>
                    ))
                }
            </div>
        </div>
    )
}