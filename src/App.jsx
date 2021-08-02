import { useEffect } from "react";
import { Routes, Route } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { getSharedPages } from "./features/shared/sharedSlice";
import { getUserPages } from "./features/pages/pageSlice";
import { NewPage, AllPages, Shared, Page } from "./features";
import { Login, SignUp, Account } from "./pages";
import { Navbar, PrivateRoute } from "./components";
import axios from "axios";
import { ToastContainer, Slide } from "react-toastify";
import { injectStyle } from "react-toastify/dist/inject-style";
import "./css/App.css";

function App() {
  const { status, authUserToken, isAuthenticated } = useSelector((state) => state.auth);
  const { pageStatus } = useSelector((state) => state.page)
  const { sharedStatus } = useSelector((state) => state.share)
  const dispatch = useDispatch();
  useEffect(() => {
    if(status === "tokenReceived") {
      axios.defaults.headers.common["Authorization"] = authUserToken;
    }
    if(pageStatus === "idle" ) {
      dispatch(getUserPages())
    }
    if(sharedStatus === "idle") {
      dispatch(getSharedPages())
    }
  },[status, authUserToken, dispatch, pageStatus, sharedStatus])

  if (typeof window !== "undefined") {
    injectStyle();
  }

  return (
    <div className="relative">
      {isAuthenticated && <Navbar />}
        <div className={` md:mt-0 ${isAuthenticated ? "mt-16 p-4 md:ml-52" : "" }`}>
            <Routes>
                <PrivateRoute path="/" element={<AllPages />} />
                <PrivateRoute path="/create" element={<NewPage />} />
                <PrivateRoute path="/edit-page/:pageId" element={<NewPage />} />
                <PrivateRoute path="/account" element={<Account />} />
                <PrivateRoute path="/shared" element={<Shared />} />
                <Route path="/public/:pageId" element={<Page/>}/>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
            </Routes>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                transition={Slide}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
            />
        </div>
    </div>
  );
}

export default App;
