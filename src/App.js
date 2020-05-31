import React, { useState,useEffect } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import Home from './pages/Home';
import Admin from './pages/Admin';
import Login from "./pages/Login";
import Signup from './pages/Signup';
import { AuthContext } from "./context/auth";
import PrivateRoute from './PrivateRoute';
import axios from "axios";

function App(props) {
  const existingTokens = JSON.parse(localStorage.getItem("tokens"));
  const [authTokens, setAuthTokens] = useState(existingTokens);

  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  }
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/account")
      .then((result) => setData(result.data))
  }, []);
  // props.location.state =data;
  // console.log(data)
  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <Router>
        <div>
          {/* <ul>
            <li>
              <Link to="/">Home Page</Link>
            </li>
            <li>
              <Link to="/admin">Admin Page</Link>
            </li>
          </ul> */}
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <PrivateRoute path="/admin" component={Admin} />
        </div>
      </Router>
    </AuthContext.Provider>

  );
}

export default App;