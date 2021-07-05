import { useSelector, useDispatch } from "react-redux";
import { deleteUserPage } from "./pageSlice";
import { sharePage } from "../shared/sharedSlice";
import { PageCard, Loader } from "../../components";

export default function AllPages() {
    const { notion, pageStatus } = useSelector((state) => state.page);
    const { publicPage } = useSelector((state) => state.share);
    const dispatch = useDispatch();

    const deletePageHandler = (pageId) => {
        dispatch(deleteUserPage(pageId))
    }

    const sharePageHandler = (pageId) => {
        dispatch(sharePage(pageId))
    }
    
    return (
        <div>
            <div className="text-2xl">Your Pages</div>
            {pageStatus === "loading" && <Loader/>}
            <div className="notesGrid my-4">
                { notion &&
                    notion.map((page) => (
                        <PageCard 
                            key={page._id}
                            page={page}
                            deletePageHandler={deletePageHandler}
                            sharePageHandler={sharePageHandler}
                            publicPage={publicPage}
                        />
                    ))
                }
            </div>
        </div>
    )
}
