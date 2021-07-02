import { Link } from "react-router-dom"

export const Shorts = ({page}) => {
  return (
    <div className="rounded-md bg-white shadow-md" key={page._id}>
        <div className="flex justify-between bg-gray-50 p-2 items-center">
            <span className="text-xs font-semibold text-gray-700">{page.date}</span>
            <button className="text-sm font-medium text-red-500 bg-red-50 p-1 rounded">
                Delete
            </button>
        </div>
        <Link to={`/edit-page/${page._id}`}>
            <div className="px-4 pb-4 rounded-md">
                <div className="text-3xl font-bold my-1 note-title">{page.title}</div>
                <div className="shortPage">{page.content}</div>
            </div>
        </Link>
    </div>
  );
};
