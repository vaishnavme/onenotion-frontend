import { useState } from "react";
import { useSelector } from "react-redux";

export const DropdownMenu = ({
    currentLabel, setCurrentLabel, allLabel
}) => {
    const allNotions = useSelector((state) => state.notion.notes);

    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const toggleDropdown = () => setDropdownVisible(prevState => !prevState)

    return (
        <div className="relative">
            <div>
                <button onClick={toggleDropdown} className="flex items-center px-2 py-1 rounded bg-gray-800 text-white">
                    {currentLabel} <i className='ml-2 bx bxs-chevron-down'></i>
                </button>
            </div>
            <div className={`absolute z-10 bg-gray-800 shadow-md w-64 rounded p-3 my-1 ${isDropdownVisible ? "block": "hidden"}`}>
                <div>
                    {/* {
                        allLabel.map((noteLabel, index) => (
                            <div key={index} className="flex justify-between items-center w-full my-1 focus:ring-0">
                                <button>{noteLabel}</button>
                                <button onClick={() => removeLabel(noteLabel)}><i className="text-xl bg-gray-100 px-1 rounded-full	 bx bx-x"></i></button>
                            </div>
                        ))
                    } */}
                </div>
                <div className="my-1 flex justify-between items-center">
                    <input className="p-1 bg-gray-700 rounded" type="text" placeholder="Add label"/>
                    <button><i className='bx bx-plus text-xl bg-gray-700 text-white px-1 rounded' ></i></button>
                </div>
            </div>
        </div>
    )
}