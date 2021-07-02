import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOutUser } from "../features/auth/authSlice";

export const Navbar = () => {
    const [toggle, setToggle] = useState(false);
    const dispatch = useDispatch();
    
    const activeColor = {
        color: "#000000",
        backgroundColor: "#ffffff",
        borderRadius: "0.4rem",
        transition: "ease 200ms",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
    }
    const toggleBtnHandler = () => setToggle(
        (prevState) => !prevState
    )

    const logOutHandler = () => {
        dispatch(logOutUser())
    }

    return (
        <React.Fragment>
            <header className="fixed top-0 left-0 w-full shadow bg-white px-4 z-10 md:hidden">
                <div className="flex items-center justify-between h-16">
                    <NavLink to="/" className="text-2xl md:ml-20 md:hidden">
                        One Notion
                    </NavLink>
                    <div className="text-2xl cursor-pointer md:hidden" onClick={() => toggleBtnHandler()}>
                        <i className={toggle ? `bx bx-x` : `bx bx-menu-alt-right`}></i>
                    </div>
                </div>
            </header>

            <div className={toggle ? `${navStyle} left-0 w-64` : `${navStyle} -left-full w-52 md:left-0 pt-5 px-6`}>
                <nav className="flex justify-between flex-col h-full pb-12 overflow-auto">
                    <div>
                        <NavLink to="/" className="mb-10 font-semibold flex items-center">
                            <i className='bx bx-wind text-2xl'></i>
                            <span className="text-lg whitespace-nowrap ml-4">One Notion</span>
                        </NavLink>

                        <div className="grid gap-y-10 mt-32">
                            <div className="grid gap-y-6">
                                <NavLink to="/create" activeStyle={activeColor} className="flex items-center p-1" end>
                                    <i className="bx bx-pencil text-2xl p-1"></i>
                                    <span className="text-base whitespace-nowrap ml-4">Create New</span>
                                </NavLink>
                                <NavLink to="/" activeStyle={activeColor} className="flex items-center p-1" end>
                                    <i className="bx bx-notepad text-2xl p-1"></i>
                                    <span className="text-base whitespace-nowrap ml-4">All Notes</span>
                                </NavLink>
                                <NavLink to="/shared" activeStyle={activeColor} className="flex items-center p-1">
                                    <i className='bx bx-intersect text-2xl p-1'></i>
                                    <span className="text-base whitespace-nowrap ml-4">Shared</span>
                                </NavLink>
                                <NavLink to="/account" activeStyle={activeColor} className="flex items-center p-1">
                                    <i className="bx bx-user text-2xl p-1"></i>
                                    <span className="text-base whitespace-nowrap ml-4">Account</span>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                    <button onClick={logOutHandler} className="flex items-center p-1 rounded-lg hover:text-black hover:bg-white hover:shadow-md">
                        <i className="bx bx-log-out text-2xl p-1"></i>
                        <span className="text-base whitespace-nowrap ml-4">Log Out</span>
                    </button>
                </nav>
            </div>
        </React.Fragment>
    )
}

const navStyle = "fixed top-0 h-full pt-4 px-4 pb-0 shadow bg-blue-100 z-50 overflow-hidden transition-all duration-500 ease-in-out"