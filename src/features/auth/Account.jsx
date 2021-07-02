import { useSelector } from "react-redux"

export default function Account() {
    const { authUser } = useSelector(state => state.auth);
    console.log("authUser", authUser);
    return (
        <div>
            <div className="text-3xl font-medium">Account</div>
                <div className="m-auto w-full max-w-3xl">

                </div>
        </div>
    )
}