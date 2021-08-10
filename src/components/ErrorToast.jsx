export const ErrorToast = ({message, setMessage}) => {
    return (
        <div className={`${message ? "block" : "hidden"} bg-red-500 w-72 text-white rounded shadow px-4 py-2 flex items-center justify-between`}>
            <p>{message}</p> 
            <button onClick={() => setMessage("")} className="text-lg">X</button>
        </div>
    )
}