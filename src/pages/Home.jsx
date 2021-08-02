import { useSelector, useDispatch } from "react-redux";
import { deleteUserPage } from "../features/pages/pageSlice";
import { sharePage } from "../features/shared/sharedSlice";
import { PageCard, Loader } from "../components";

export default function AllPages() {
    const { pages, pageStatus } = useSelector((state) => state.page);
    const { sharedStatus } = useSelector((state) => state.share)
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
            {pageStatus === "loading" && <Loader/>}
            <div className="text-2xl font-semibold">Your Pages</div>
            {
                pages.length === 0 ?
                <div className="mx-auto text-center my-12">
                    <div className="font-semibold">You don't have any pages</div>
                </div>
            : 
            <div>
                <div className="notesGrid my-4">
                    { pages &&
                        pages.map((page) => (
                            <PageCard 
                                key={page._id}
                                page={page}
                                deletePageHandler={deletePageHandler}
                                sharePageHandler={sharePageHandler}
                                publicPage={publicPage}
                                pageStatus={pageStatus}
                                sharedStatus={sharedStatus}
                            />
                        ))
                    }
                </div>
            </div>
            }
        </div>
    )
}
