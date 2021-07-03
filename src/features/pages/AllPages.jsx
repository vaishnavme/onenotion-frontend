import { useSelector, useDispatch } from "react-redux";
import { deleteUserPage, makePageShare } from "./pageSlice";
import { PageCard } from "../../components";

export default function AllPages() {
    const { pages } = useSelector((state) => state.notion);
    const dispatch = useDispatch();

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
