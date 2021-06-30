import { Fragment } from "react";
import { Routes, Route } from "react-router";
import { NewNote, AllNotes, Login, SignUp} from "./features";
import { Navbar } from "./components";
import "./App.css";

function App() {
  return (
    <Fragment>
      <Navbar/>
      <div className="mt-16 p-4 md:ml-52 md:mt-0">
        <Routes>
          <Route path="/" element={<AllNotes/>}/>
          <Route path="/create" element={<NewNote/>}/>
          <Route path="/edit-page/:noteId" element={<NewNote/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<SignUp/>}/>
        </Routes>
      </div>
    </Fragment>
  );
}

export default App;
