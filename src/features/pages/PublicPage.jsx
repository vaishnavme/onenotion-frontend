import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import { getPublicPageList } from "./pageSlice";

export default function PublicPage() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getPublicPageList());
    },[])
    return (
        <div>
            Shared
        </div>
    )
}