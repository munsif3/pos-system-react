import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Orders from "../order-list/Orders";
import NavBar from "./NavBar";
import Login from "../login/Login";

const Main = () => {
  return (
    <main>
      <Router>
        <div>
          <NavBar />
          <Switch>
            <Route exact path="/" component={Orders} />
            <Route path="/login" component={Login} />
          </Switch>
        </div>
      </Router>
      <br />
    </main>
  );
};

export default Main;
