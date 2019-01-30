import React, { Component } from "react";
import { Container, ListGroup, Row, Col, Button } from "reactstrap";
import { TransitionGroup } from "react-transition-group";
import OrderListItem from "./OrderListItem";
import OrderModal from "../order/OrderModal";

class Orders extends Component {
  state = {
    modal: false
  };

  toggleModalState = () => {
    this.setState({ modal: !this.state.modal });
  };

  openModal = (orderNo, isNew) => {
    this.setState({ modal: !this.state.modal, orderNo: orderNo });
  };

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
              <OrderListItem openModal={this.openModal} />
            </TransitionGroup>
          </ListGroup>
          <OrderModal
            isNew={this.state.isNew}
            orderNo={this.state.orderNo}
            toggleModalState={this.toggleModalState}
            modal={this.state.modal}
          />
          <Button
            className="float-right"
            color="primary"
            size="lg"
            style={{
              marginTop: "2rem",
              paddingLeft: "3rem",
              paddingRight: "3rem",
              paddingBottom: "1rem",
              paddingTop: "1rem"
            }}
            onClick={() => this.openModal(0)}
          >
            &#43;&nbsp; New
          </Button>
        </Container>
      </div>
    );
  }
}

export default Orders;
