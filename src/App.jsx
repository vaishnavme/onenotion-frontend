import { Fragment } from "react";
import { Notions } from "./features";
import { Navbar } from "./components";

function App() {
  return (
    <Fragment>
      <Navbar/>
      <div className="md:ml-52 p-4">
        <Notions/>
      </div>
    </Fragment>
  );
}

export default App;
