import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";


import ContractsList from "./components/ContractsList"
import JobsList from "./components/JobsList";
import Home from "./components/Home";



function App() {
  return (
    <div className="container">
      <Router>
        <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <ul className="nav navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" exact={true} activeClassName='active' to="/">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" activeClassName='active' to="/contracts">Contracts</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" activeClassName='active' to="/jobs">Jobs</NavLink>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route exactly path="/contracts">
              <ContractsList/>
            </Route>
            <Route exactly path="/jobs">
              <JobsList/>
            </Route>
            <Route exactly path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
