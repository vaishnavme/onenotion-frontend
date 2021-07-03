import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserPages, deleteUserPage, makePageShare } from "./pageSlice";
import { PageCard } from "../../components";

export default function AllPages() {
    const {pages, status} = useSelector((state) => state.notion);
    const { isAuthenticated, authUserToken } = useSelector((state) => state.auth);
    console.log("status", status)

    const dispatch = useDispatch();
    

    useEffect(() => {
        isAuthenticated && dispatch(getUserPages(authUserToken))
    }, [isAuthenticated, dispatch, authUserToken ])

    const deletePageHandler = (pageId) => {
        dispatch(deleteUserPage(pageId))
    }

    const sharePageHandler = (pageId) => {
        dispatch(makePageShare(pageId))
    }
    
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
                { pages &&
                    pages.map((page) => (
                        <PageCard 
                            key={page._id}
                            page={page}
                            deletePageHandler={deletePageHandler}
                            sharePageHandler={sharePageHandler}
                        />
                    ))
                }
            </div>
        </div>
    )
}
