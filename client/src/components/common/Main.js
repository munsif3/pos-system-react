import React, { Component } from "react";
import {
  Route,
  BrowserRouter as Router,
  withRouter,
  Redirect,
  Switch
} from "react-router-dom";
import NavBar from "./NavBar";
import Orders from "../order-list/Orders";
import Login from "../login/Login";
import ProtectedRoute from "../common/ProtectedRoute";
import CreateError from "./CreateError";

class Main extends Component {
  render() {
    return (
      <Router>
        <div>
          <NavBar />
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/orders" />} />
            <Route path="/login" component={withRouter(Login)} />
            <ProtectedRoute exact path="/orders" component={Orders} />
            <Route path="*" component={CreateError} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default Main;
