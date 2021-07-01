import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { emailRegex } from "../../components";

export default function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPwd, setConfirmPwd] = useState("");
    const [isValid, setValid] = useState(false);

    useEffect(() => {
        if(name && emailRegex.test(email) && password && confirmPwd) {
            setValid(true)
        }
    },[name, email, password, confirmPwd])

    const signupHandler = () => {
        if(isValid) {

        } 
    }
   
    return (
        <div className="bg-white w-96 m-auto my-10 shadow-xl rounded-md">
            <div className="py-4 px-4">
                <h1 className="font-light text-4xl mt-3 text-center">Create Account</h1>
                <form action="" className="mt-6">
                <div className="my-5 text-sm">
                        <label htmlFor="name" className="block text-black">Name</label>
                        <input 
                            onChange={(e) => setName(e.target.value)}
                            type="text" 
                            autoFocus id="name" 
                            className="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full"
                            required={true} 
                            placeholder="Name" />
                    </div>
                    <div className="my-5 text-sm">
                        <label htmlFor="email" className="block text-black">Email</label>
                        <input 
                            onChange={(e) => setEmail(e.target.value)}
                            type="email" 
                            id="email" 
                            className="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full"
                            required={true}  
                            placeholder="Email" />
                    </div>
                    <div className="my-5 text-sm">
                        <label htmlFor="password" className="block text-black">Password</label>
                        <input 
                            onChange={(e) => setPassword(e.target.value)}
                            type="password" 
                            id="password" 
                            className="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full" 
                            required={true} 
                            placeholder="Password" />
                    </div>
                    <div className="my-5 text-sm">
                        <label htmlFor="password" className="block text-black">Confirm Password</label>
                        <input 
                            onChange={(e) => setConfirmPwd(e.target.value)}
                            type="password" 
                            id="password" 
                            className="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full" 
                            required={true} 
                            placeholder="Confirm Password" />
                    </div>

                    <button 
                        onClick={(e) => {e.preventDefault(); signupHandler();}}
                        disabled={!isValid}
                        className={`block text-center text-white bg-gray-800 p-3 duration-300 rounded-sm ${isValid ? "hover:bg-black" : "hover:bg-gray-800"} w-full`}>
                            Signup
                    </button>
                </form>
                <p className="mt-12 text-xs text-center font-light text-gray-400"> Already have an account? <Link to="/login" className="text-black font-medium"> Log In </Link></p> 

            </div>
        </div>
    )
}