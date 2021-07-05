import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteSharedPage } from "./sharedSlice";

export default function Shared() {
    const { publicPage } = useSelector((state) => state.share);
    const [publicPageLink, setPublicPageLink] = useState("");
    const dispatch = useDispatch(); 

    const deletePublicPage = (pageId) => {
        dispatch(deleteSharedPage(pageId))
    }

    const getPublicPageLink = (pageId) => {
        const url = window.location.origin;
        const pageLink = url + `/public/` + pageId;
        setPublicPageLink(pageLink)
        navigator.clipboard.writeText(publicPageLink)
    }


    return (
        <div className="m-auto w-full max-w-3xl p-2">
            <div className="bg-yellow-100 text-yellow-600 rounded p-4">
                <div className="text-xl font-medium">Hey 👋 You created a public page.</div>
                <span className="text-xs">This pages are accessible by anyone via link</span>
                <div className="mt-4 flex items-center justify-between">
                    <input
                        readOnly={true}
                        value={publicPageLink} 
                        className="rounded w-full p-2"
                        type="text"
                        placeholder="Public page link"
                    />
                </div>
            </div>
            {
                publicPage.length === 0 ? (
                    <div className="text-3xl">No Public pAGES</div>
                ) : (
                    <ul>
                    { publicPage &&
                        publicPage.map((page) => (
                            <li key={page._id} 
                                className="flex items-center justify-between bg-blue-50 text-lg font-medium p-2 my-2 rounded">
                                <div className="text-gray-900">{page.title.substring(0, 20)}</div>
                                <div>
                                    <button
                                        onClick={() => getPublicPageLink(page._id)} 
                                        className="bg-white hover:bg-blue-400 hover:text-white px-2 rounded mr-4">
                                        <i className='bx bx-copy'></i>
                                    </button>
                                    <button 
                                        onClick={() => deletePublicPage(page._id)}
                                        className="bg-white hover:bg-red-400 hover:text-white px-2 rounded">
                                        <i className='bx bx-trash'></i>
                                    </button>
                                </div>
                            </li>
                        ))
                    }
                </ul>
                )
            }
        </div>
    )
}