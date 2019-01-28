import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Orders from "../order-list/Orders";
import OrderListItem from "../order-list/OrderListItem";
import OrderModal from "../order/OrderModal";
import NavBar from "./NavBar";
import Login from "../login/Login";

const Main = () => {
  return (
    <main>
      <NavBar />
      <Router>
        <Switch>
          <Route exact path="/" component={Orders} />
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
