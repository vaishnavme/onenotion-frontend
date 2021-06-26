import { Fragment } from "react";
import { Routes, Route } from "react-router";
import { NewNote, AllNotes} from "./features";
import { Navbar } from "./components";

function App() {
  return (
    <Fragment>
      <Navbar/>
      <div className="md:ml-52 p-4">
        <Routes>
          <Route path="/" element={<AllNotes/>}/>
          <Route path="/new" element={<NewNote/>}/>
        </Routes>
      </div>
    </Fragment>
  );
}

export default App;
