import { useEffect } from "react";
import { Routes, Route } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { getSharedPages } from "./features/shared/sharedSlice";
import { getUserPages } from "./features/pages/pageSlice";
import { NewPage, AllPages, Shared, Login, SignUp, Account, Page } from "./features";
import { Navbar, PrivateRoute } from "./components";
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

  return (
    <div>
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
        </div>
    </div>
  );
}

export default App;
