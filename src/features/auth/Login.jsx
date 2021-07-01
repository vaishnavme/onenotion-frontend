import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logInUserWithCredentials } from "./authSlice";

export default function Login() {
    const { status } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const logInHandler = async() => {
        await dispatch(
            logInUserWithCredentials({
                email,
                password
            })
        )
    }

    return (
        <div className="bg-white">
            <div className="bg-white lg:w-4/12 md:6/12 w-10/12 m-auto my-10 shadow-xl">
                <div className="py-8 px-8 rounded-xl">
                    <h1 className="font-light text-4xl mt-3 text-center">Welcome Back</h1>
                    <form action="" className="mt-6">
                        <div className="my-5 text-sm">
                            <label htmlFor="username" className="block text-black">Email</label>
                            <input 
                                onChange={(e) => setEmail(e.target.value)}
                                type="text" 
                                autoFocus id="username" 
                                className="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full" 
                                placeholder="Email" />
                        </div>
                        <div className="my-5 text-sm">
                            <label htmlFor="password" className="block text-black">Password</label>
                            <input 
                                onChange={(e) => setPassword(e.target.value)}
                                type="password" 
                                id="password" 
                                className="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full" 
                                placeholder="Password" />
                        </div>

                        <button 
                            onClick={(e) => {e.preventDefault(); logInHandler();}}
                            className="block text-center text-white bg-gray-800 p-3 duration-300 rounded-sm hover:bg-black w-full">
                                Login
                        </button>
                    </form>
                    <p className="mt-12 text-xs text-center font-light text-gray-400"> Don't have an account? <Link to="/signup" className="text-black font-medium"> Create One </Link>  </p> 
                </div>
            </div>
        </div>
    )
}