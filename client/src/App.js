import React, { Component } from "react";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import store from "./store";
import Main from "./components/common/Main";
import setAuthToken from "./setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

// Check localStorage is JWT is available and not expired,
// if not redirect to login page
if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser(window.history));
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}

export default App;
