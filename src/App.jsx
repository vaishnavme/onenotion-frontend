import { Fragment } from "react";
import { Routes, Route } from "react-router";
import { NewNote, Notions} from "./features";
import { Navbar } from "./components";

function App() {
  return (
    <Fragment>
      <Navbar/>
      <div className="md:ml-52 p-4">
        <Routes>
          <Route to="/" element={<Notions/>}/>
          <Route to="/new" element={<NewNote/>}/>
        </Routes>
      </div>
    </Fragment>
  );
}

export default App;
