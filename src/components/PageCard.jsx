import { useState } from "react";
import { Link } from "react-router-dom";
import { alreadyExist } from "."

export const PageCard = ({page, deletePageHandler, sharePageHandler, publicPage, pageStatus, sharedStatus}) => {
    const [isMenuVisible, setMenuVisible] = useState(false);
    return (
    <div className="rounded-md bg-white shadow-md">
        <div className="relative flex justify-between bg-gray-50 p-2 items-center">
            <span className="text-xs font-semibold text-gray-700">{page.date}</span>
            <button onClick={() => setMenuVisible(prevState => !prevState)} className="bg-white px-1 rounded hover:bg-blue-50">
                <i className='bx bx-dots-vertical text-xl'></i>
            </button>
            {
                isMenuVisible && 
                <div className="origin-right top-8 right-3 absolute right-0 mt-2 w-20 rounded text-left shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <button
                        onClick={() => deletePageHandler(page._id)}
                        className="border-b w-full px-2 hover:text-red-500 hover:bg-red-100 cursor-pointer">
                            {pageStatus === "deleting" ? <i className="animate-spin bx bx-loader-alt font-thin"></i> : "Delete"}
                        </button>

                    <button 
                        disabled={alreadyExist(publicPage, page._id) ? true : false}
                        onClick={() => sharePageHandler(page._id)}
                        className="px-2 w-full hover:text-blue-500 hover:bg-blue-100 cursor-pointer">
                            {sharedStatus === "sharing" ?
                            <i className="animate-spin bx bx-loader-alt font-thin"></i> 
                            :   alreadyExist(publicPage, page._id) ? "Shared" : "Share"}
                        </button>
                </div>
            }
        </div>
        <Link to={`/draft/${page._id}`}>
            <div className="px-4 pb-4 rounded-md">
                <div className="text-3xl font-bold my-1 note-title">{page.title}</div>
                <div className="shortPage">{page.content}</div>
            </div>
        </Link>
    </div>
  );
};


            