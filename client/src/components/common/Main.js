import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import OrderList from "../order-list/OrderList";
import OrderModal from "../OrderModal";
import NavBar from "./NavBar";
import Login from "../login/Login";

const Main = () => {
  return (
    <main>
      <NavBar />
      <Router>
        <Switch>
          <Route exact path="/" component={OrderList} />
          {/* <Route path="/new" component={OrderModal} /> */}
          <Route path="/login" component={Login} />
        </Switch>
      </Router>
      <br />
      <OrderModal />
    </main>
  );
};

export default Main;
