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
            <div className="text-2xl font-semibold">Your Pages</div>
            {
                notion.length === 0 ?
                <div className="mx-auto text-center my-12">
                    <div className="font-semibold">You don't have any pages</div>
                </div>
            : 
            <div>
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
            }
        </div>
    )
}
