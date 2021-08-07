import { useSelector } from "react-redux"
import { getTimeandData } from "../../../components";
import { Link } from "react-router-dom";

export default function Account() {
    const { authUser } = useSelector(state => state.auth);
    const { pages } = useSelector((state) => state.notion);
    const { publicPage } = useSelector((state) => state.share);

    return (
        <div>
            <div className="m-auto w-full max-w-3xl border p-4 rounded">
                <div className="flex justify-between">
                    <div className="text-3xl font-medium">Account</div>
                    <div className="text-sm font-medium">{getTimeandData()}</div>
                </div>
                <div className="my-8">
                    <div className="text-2xl">Hi <span className="font-bold">{authUser.name}</span></div>
                    <div className="my-5 text-sm">
                        <label htmlFor="email" className="block text-black">Email</label>
                        <input 
                            type="text" 
                            id="email"
                            readOnly={true}
                            value={authUser.email} 
                            className="rounded-sm font-normal text-lg px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full" 
                            placeholder="Email" />
                    </div>
                </div>
                <div>
                    <div className="text-sm font-medium">All Pages</div>
                    {
                        pages.length === 0 ?
                        <div className="font-semibold text-center">You don't have any pages</div>
                        : 
                        <div>
                            <ul className="my-4">
                            {
                            pages && pages?.map((page) => (
                                    <Link to={`/edit-page/${page._id}`} key={page._id}>
                                        <li className="flex justify-between items-center p-4 my-2 rounded bg-gray-50 hover:bg-blue-100">
                                            <div className="font-medium">{page.title}</div>
                                            <div className="text-xs font-medium">{page.date}</div>
                                        </li>
                                    </Link>
                                ))
                            }
                            </ul>
                            <div className="text-sm font-medium">Public Pages</div>
                            <ul className="my-4">
                            {
                            publicPage && publicPage.map((page) => (
                                    <Link to={`/edit-page/${page._id}`} key={page._id}>
                                        <li className="flex justify-between items-center p-4 my-2 rounded bg-gray-50 hover:bg-blue-100">
                                            <div className="font-medium">{page.title}</div>
                                            <div className="text-xs font-medium">{page.date}</div>
                                        </li>
                                    </Link>
                                ))
                            }
                        </ul>
                    </div>
                    }
                </div>
            </div>
        </div>
    )
}