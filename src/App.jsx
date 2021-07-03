import { useEffect } from "react";
import { Routes, Route } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { getUserPages } from "./features/pages/pageSlice";
import { NewPage, AllPages, Login, PublicPage, SignUp, Account } from "./features";
import { Navbar, PrivateRoute, Page } from "./components";
import "./css/App.css";


function App() {
  const { status, authUserToken, isAuthenticated } = useSelector((state) => state.auth);
  const { pageStatus } = useSelector((state) => state.notion)
  const dispatch = useDispatch();
  
  useEffect(() => {
    if(status === "tokenReceived") {
      axios.defaults.headers.common["Authorization"] = authUserToken;
    }
    if(pageStatus === "idle") {
      dispatch(getUserPages())
    }
  },[status, authUserToken, dispatch, pageStatus])

  return (
    <div>
      {isAuthenticated && <Navbar />}
        <div className={` md:mt-0 ${isAuthenticated ? "mt-16 p-4 md:ml-52" : "" }`}>
            <Routes>
                <PrivateRoute path="/" element={<AllPages />} />
                <PrivateRoute path="/create" element={<NewPage />} />
                <PrivateRoute path="/edit-page/:pageId" element={<NewPage />} />
                <PrivateRoute path="/account" element={<Account />} />
                <PrivateRoute path="/shared" element={<PublicPage />} />
                <Route path="/public/:pageId" element={<Page/>}/>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
            </Routes>
        </div>
    </div>
  );
}

export default App;
