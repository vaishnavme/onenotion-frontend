import { Fragment } from "react";
import { Routes, Route } from "react-router";
import { Notions, Create, Account } from "./features";
import { Navbar } from "./components";

function App() {
  return (
    <Fragment>
      <Navbar/>
      <div className="md:ml-52 p-4">
        <Routes>
          <Route to="/" element={<Notions/>}/>
          <Route to="/create" element={<Create/>}/>
          <Route to="/account" element={<Account/>}/>
        </Routes>
      </div>
    </Fragment>
  );
}

export default App;
