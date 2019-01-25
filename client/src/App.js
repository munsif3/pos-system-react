import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import NavBar from "./components/NavBar";
import OrderList from "./components/OrderList";
import Error from "./components/Error";
import { Provider } from "react-redux";
import store from "./store";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <NavBar />
            <Switch>
              <Route path="/" component={OrderList} exact />
              <Route path="/orders" component={OrderList} />
              {/* <Route component={Error} /> */}
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
