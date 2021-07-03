import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import { getPublicPageList, deletePageShared } from "./pageSlice";

export default function PublicPage() {
    const { publicPages } = useSelector((state) => state.notion);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getPublicPageList());
    },[dispatch])

    const deletePublicPage = (pageId) => {
        dispatch(deletePageShared(pageId))
    }

    return (
        <div className="m-auto w-full max-w-3xl p-2">
            <div className="bg-yellow-100 text-yellow-600 rounded p-4">
                <div className="text-xl font-medium">Hey 👋 You just created a public page.</div>
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
                        publicPages && 
                        publicPages.map((page) => (
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