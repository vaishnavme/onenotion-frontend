import { useSelector, useDispatch } from "react-redux";
import { deleteUserPage } from "./pageSlice";
import { sharePage } from "../shared/sharedSlice";
import { PageCard } from "../../components";

export default function AllPages() {
    const { pages } = useSelector((state) => state.notion);
    const dispatch = useDispatch();

    const deletePageHandler = (pageId) => {
        dispatch(deleteUserPage(pageId))
    }

    const sharePageHandler = (pageId) => {
        dispatch(sharePage(pageId))
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
