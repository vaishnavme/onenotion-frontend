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
