import React from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login';


function App() {
  return (
    <Router>
      <div className="container w-100">
        <div className="row justify-content-center">
          <div className="col">
            {/* <div className="btn-group">
              <Link to="/" className="btn btn-dark m-1">
                Login
              </Link>
              <Link to="/home" className="btn btn-dark m-1">
                Home
              </Link>
            </div> */}
            <Routes>
              <Route path="/home" element={<Home />}></Route>
              <Route path="/" element={<Login />}></Route>
            </Routes>
          </div>
          </div>
      </div>
    </Router>
  );
}

export default App;
