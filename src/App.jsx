import { useEffect } from 'react';
import { Routes, Route } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { getSharedPages } from './features/shared/sharedSlice';
import { getUserPages } from './features/notions/notionSlice';
import { logOutUser } from "./features/auth/authSlice";
import { Login, SignUp, Home, Page, Shared, CreatePage } from './features';
import { Navbar, PrivateRoute } from './components';
import axios from 'axios';
import './css/App.css';

function App() {
    const { authUserToken, isAuthenticated } = useSelector((state) => state.auth);
    const { pageStatus } = useSelector((state) => state.notion);
    const { sharedStatus } = useSelector((state) => state.share);
    const dispatch = useDispatch();

    axios.interceptors.request.use(
        function (config) {
            if (authUserToken) {
                config.headers.Authorization = `Bearer ${authUserToken}`;
            }
            return config;
        },
        function (err) {
            console.log('general request rejected', err.response.status);
            return Promise.reject(err);
        }
    );
    axios.interceptors.response.use((response) => response,
        (error) => {
            if (error?.response?.status === 401) {
                dispatch(logOutUser())
            }
            return Promise.reject(error);
        }       
    );

    useEffect(() => {
        if (authUserToken) {
            if (pageStatus === 'idle') {
                dispatch(getUserPages());
            }
            if (sharedStatus === 'idle') {
                dispatch(getSharedPages());
            }
            console.log("called")
        }
    }, [authUserToken, dispatch, pageStatus, sharedStatus]);

    return (
        <div className="relative">
            {isAuthenticated && <Navbar />}
            <div
                className={` md:mt-0 ${
                    isAuthenticated ? 'mt-16 p-4 md:ml-52' : ''
                }`}
            >
                <Routes>
                    <PrivateRoute path="/" element={<Home />} />
                    <PrivateRoute path="/create" element={<CreatePage />} />
                    <PrivateRoute
                        path="/draft/:pageId"
                        element={<CreatePage />}
                    />
                    <PrivateRoute path="/shared" element={<Shared />} />
                    <Route path="/public/:pageId" element={<Page />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
