import React, { Component } from "react";
import {
  Switch,
  Route,
  Redirect,
  BrowserRouter as Router,
  withRouter
} from "react-router-dom";
import { connect } from "react-redux";
import NavBar from "./NavBar";
import Orders from "../order-list/Orders";
import Login from "../login/Login";
import ProtectedRoute from "../common/ProtectedRoute";
import { logoutUser } from "../../actions/authActions";

class Main extends Component {
  render() {
    return (
      <Router>
        <div>
          <NavBar />
          <Route path="/login" component={withRouter(Login)} />
          <ProtectedRoute path="/orders" component={Orders} />
        </div>
      </Router>
    );
  }
}

export default Main;
// const mapStateToProps = state => ({
//   auth: state.auth
// });

// export default connect(
//   mapStateToProps,
//   { logoutUser }
// )(Main);
