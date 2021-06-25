import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export const Navbar = () => {
    const [toggle, setToggle] = useState(false);
    
    const activeColor = {
        color: "#22D3EE"
    }
    const toggleBtnHandler = () => setToggle(
        (prevState) => !prevState
    )

    return (
        <React.Fragment>
            <header className="fixed top-0 left-0 w-full shadow bg-white px-4 z-10">
                <div className="flex items-center justify-between h-16">
                    <NavLink to="/" className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 md:ml-20">
                        Trivia Fort
                    </NavLink>
                    <div className="text-2xl cursor-pointer md:hidden" onClick={() => toggleBtnHandler()}>
                        <i className={toggle ? `bx bx-x` : `bx bx-menu-alt-right`}></i>
                    </div>
                </div>
            </header>

            <div className={toggle ? `${navStyle} left-0` : `${navStyle} -left-full md:left-0 w-20 pt-5 px-6`}>
                <nav className="flex justify-between flex-col h-full pb-12 overflow-auto">
                    <div>
                        <NavLink to="/" className="mb-10 font-semibold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 flex items-center">
                            <i className="bx bxs-disc text-2xl"></i>
                            <span className="text-lg whitespace-nowrap font-medium ml-4">Trivia Fort</span>
                        </NavLink>

                        <div className="grid gap-y-10">
                            <div className="grid gap-y-6">
                                <NavLink to="/" activeStyle={activeColor} className="flex items-center text-gray-600" end>
                                    <i className="bx bx-home text-xl"></i>
                                    <span className="text-base whitespace-nowrap font-medium ml-4">Home</span>
                                </NavLink>
                                <NavLink to="/dashbord" activeStyle={activeColor} className="flex items-center text-gray-600">
                                    <i className="bx bxs-dashboard text-xl"></i>
                                    <span className="text-base whitespace-nowrap font-medium ml-4">Dashboard</span>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                    <NavLink to="/" className="flex items-center">
                        <i className="bx bx-log-out text-lg"></i>
                        <span className="text-base whitespace-nowrap font-medium ml-4">Log Out</span>
                    </NavLink>
                </nav>
            </div>
        </React.Fragment>
    )
}

const navStyle = "fixed top-0 h-full pt-4 px-4 pb-0 shadow bg-white z-10 overflow-hidden transition-all duration-500 ease-in-out"