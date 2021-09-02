import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetStatus } from '../features/auth/authSlice';
import { signupUserWithCredentials } from '../features/auth/request';

export default function SignUp() {
    const { status, isAuthenticated } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [signupCred, setSignupCred] = useState({});
    const [errorMessage, setErrorMessage] = useState('');

    const dispatch = useDispatch();

    const signupCredHandler = (e) => {
        setSignupCred((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const validate = () => {
        if (
            !/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/i.test(signupCred.email)
        ) {
            setErrorMessage('Invalid Email address!');
            return false;
        }
        if (
            !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/i.test(
                signupCred.password
            )
        ) {
            setErrorMessage(
                'Must be atleast 8 characters long and contain 1 uppercase, lowercase letter and number.'
            );
            return false;
        }
        setErrorMessage('');
        return true;
    };

    const signupHandler = (e) => {
        e.preventDefault();
        if (validate()) {
            dispatch(signupUserWithCredentials(signupCred));
        }
    };

    useEffect(() => {
        dispatch(resetStatus());
        isAuthenticated && navigate('/');
        // eslint-disable-next-line
    }, [isAuthenticated, navigate]);

    return (
        <div className="flex items-center backgorundImage">
            <div className="bg-white w-96 m-auto my-10 shadow-xl rounded-md bg-opacity-40 backdrop-filter backdrop-blur-sm">
                <div className="py-4 px-4">
                    <h1 className="font-light text-4xl mt-3 text-center">
                        Create Account
                    </h1>
                    <form action="" className="mt-6">
                        <div className="my-5 text-sm">
                            <label className="block text-black">Name</label>
                            <input
                                onChange={(e) => signupCredHandler(e)}
                                type="text"
                                name="name"
                                className="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full"
                                required={true}
                                placeholder="Name"
                            />
                        </div>
                        <div className="my-5 text-sm">
                            <label className="block text-black">Email</label>
                            <input
                                onChange={(e) => signupCredHandler(e)}
                                type="email"
                                name="email"
                                className="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full"
                                required={true}
                                placeholder="Email"
                            />
                        </div>
                        <div className="my-5 text-sm">
                            <label className="block text-black">Password</label>
                            <input
                                onChange={(e) => signupCredHandler(e)}
                                type="password"
                                name="password"
                                className="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full"
                                required={true}
                                placeholder="Password"
                            />
                        </div>

                        <button
                            onClick={(e) => signupHandler(e)}
                            className={`block text-center text-white bg-gray-800 p-3 duration-300 rounded-sm hover:bg-black w-full`}
                        >
                            {status === 'loading' ? (
                                <i className="animate-spin bx bx-loader-alt font-thin"></i>
                            ) : (
                                'Signup'
                            )}
                        </button>
                    </form>
                    <p className="mt-12 text-sm text-center font-normal text-gray-900">
                        {' '}
                        Already have an account?{' '}
                        <Link to="/login" className="text-black font-medium">
                            {' '}
                            Log In{' '}
                        </Link>
                    </p>
                    {errorMessage && (
                        <p className="text-red-600 text-sm text-center font-semibold">
                            {errorMessage}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
