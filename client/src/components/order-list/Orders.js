import React from "react";
import { Container, ListGroup, Row, Col } from "reactstrap";
import { TransitionGroup } from "react-transition-group";
import OrderListItem from "./OrderListItem";
import NewOrderModal from "../order/NewOrderModal";

const Orders = () => {
  return (
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
      {/* <NewOrderModal /> */}
    </Container>
  );
};

export default Orders;
