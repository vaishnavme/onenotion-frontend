import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginUser, resetStatus } from "../authSlice";

export default function Login() {
    const { status, isAuthenticated } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loginCred, setLoginCred] = useState({});

    const loginCredHandler = (e) => {
        setLoginCred((prevState) => ({
            ...prevState,
            [e.target.name] : e.target.value
        }))
    }

    const logInHandler = (e) => {
        e.preventDefault();
        dispatch(loginUser(loginCred))
    }

    useEffect(() => {
        dispatch(resetStatus());
        isAuthenticated && navigate("/");
        // eslint-disable-next-line
      }, [isAuthenticated, navigate]);



    return (
        <div className="flex items-center backgorundImage">
            <div className="bg-white w-96 m-auto py-10 shadow-xl rounded-md bg-opacity-40 backdrop-filter backdrop-blur-sm">
            <div className="py-8 px-8 rounded-xl">
                <h1 className="font-light text-4xl mt-3 text-center">Welcome Back</h1>
                <form action="" className="mt-6">
                    <div className="my-5 text-sm">
                        <label htmlFor="email" className="block text-black">Email</label>
                        <input 
                            onChange={(e) => loginCredHandler(e)}
                            type="text" 
                            name="email"
                            autoFocus id="email" 
                            className="rounded-sm font-normal px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full" 
                            placeholder="Email" />
                    </div>
                    <div className="my-5 text-sm">
                        <label htmlFor="password" className="block text-black">Password</label>
                        <input 
                            onChange={(e) => loginCredHandler(e)}
                            type="password"
                            name="password" 
                            id="password" 
                            className="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full" 
                            placeholder="Password" />
                    </div>

                    <button 
                        onClick={(e) => logInHandler(e)}
                        className="block text-center text-white bg-gray-800 p-3 duration-300 rounded-sm hover:bg-black w-full">
                            {status === "loading" ? 
                            <i className="animate-spin bx bx-loader-alt font-thin"></i> 
                            : "Login"}
                    </button>
                </form>
                <p className="mt-12 text-sm text-center font-normal text-gray-900"> Don't have an account? <Link to="/signup" className="text-black font-medium"> Create One </Link>  </p> 
            </div>
        </div>
        </div>
    )
}