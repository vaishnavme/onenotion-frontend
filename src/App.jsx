import { Fragment } from "react";
import { Routes, Route } from "react-router";
import { NewNote, AllNotes} from "./features";
import { Navbar } from "./components";
import "./App.css";

function App() {
  return (
    <Fragment>
      <Navbar/>
      <div className="mt-16 p-4 md:ml-52 md:mt-0 text-white">
        <Routes>
          <Route path="/" element={<AllNotes/>}/>
          <Route path="/new" element={<NewNote/>}/>
        </Routes>
      </div>
    </Fragment>
  );
}

export default App;
