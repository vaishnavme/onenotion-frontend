import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import { getSharedPages, deleteSharedPage } from "./sharedSlice";

export default function Shared() {
    const { sharedPages, sharedStatus } = useSelector((state) => state.shared);
    const dispatch = useDispatch(); 
    
    useEffect(() => {
        if(sharedStatus === "idle") {
            dispatch(getSharedPages());
        }
    },[dispatch, sharedStatus])

    const deletePublicPage = (pageId) => {
        dispatch(deleteSharedPage(pageId))
    }

    return (
        <div className="m-auto w-full max-w-3xl p-2">
            <div className="bg-yellow-100 text-yellow-600 rounded p-4">
                <div className="text-xl font-medium">Hey 👋 You created a public page.</div>
                <span className="text-xs">This pages are accessible by anyone via link</span>
                <div className="mt-4 flex items-center justify-between">
                    <input 
                        className="rounded w-full p-2"
                        type="text"
                        placeholder="Public page link"
                    />
                    <button className="py-2 px-3 rounded text-blue-600 bg-blue-50 hover:bg-blue-100">
                        <i className='bx bx-copy'></i>
                    </button>
                </div>
            </div>
            <ul>
                    {
                        sharedPages && 
                        sharedPages.map((page) => (
                            <li key={page._id} 
                                className="flex items-center justify-between bg-blue-100 text-lg font-medium p-2 my-2 rounded">
                                <div>{page.title.substring(0, 20)}</div>
                                <div>
                                    <button 
                                        onClick={() => deletePublicPage(page._id)}
                                        className="text-red-600 bg-red-50 hover:bg-red-100 px-2 rounded">
                                        <i className='bx bx-trash'></i>
                                    </button>
                                </div>
                            </li>
                        ))
                    }
            </ul>
        </div>
    )
}