import { useEffect } from "react";
import { Routes, Route } from "react-router";
import { useSelector } from "react-redux";
import axios from "axios";
import { NewNote, AllNotes, Login, SignUp } from "./features";
import { Navbar, PrivateRoute } from "./components";
import "./App.css";

function App() {
  const { isAuthenticated, authUserToken } = useSelector((state) => state.auth);

  useEffect(() => {
    if(isAuthenticated) {
      axios.defaults.headers.common["Authorization"] = authUserToken;
    }
    // eslint-disable-next-line
  },[])

  return (
    <div>
      {isAuthenticated && <Navbar />}
        <div className={` md:mt-0 ${isAuthenticated ? "mt-16 p-4 md:ml-52" : "" }`}>
            <Routes>
                <PrivateRoute path="/" element={<AllNotes />} />
                <PrivateRoute path="/create" element={<NewNote />} />
                <PrivateRoute path="/edit-page/:pageId" element={<NewNote />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
            </Routes>
        </div>
    </div>
  );
}

export default App;
