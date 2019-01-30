import React, { Component } from "react";
import { Container, ListGroup, Row, Col } from "reactstrap";
import { TransitionGroup } from "react-transition-group";
import OrderListItem from "./OrderListItem";
import NewOrderModal from "../order/NewOrderModal";
import OrderModal from "../order/OrderModal";

class Orders extends Component {
  render() {
    return (
      <div>
        <Container>
          <Row style={{ marginBottom: "5rem" }}>
            <Col style={{ textAlign: "center" }}>
              <h1>Pending Orders</h1>
            </Col>
          </Row>
          <ListGroup>
            <TransitionGroup>
              <OrderListItem />
            </TransitionGroup>
          </ListGroup>
        </Container>
        <NewOrderModal />
      </div>
    );
  }
}

export default Orders;
