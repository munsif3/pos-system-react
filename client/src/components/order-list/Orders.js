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

          <Row>
            <Col>
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
                  marginBottom: "2rem",
                  paddingLeft: "3rem",
                  paddingRight: "3rem",
                  paddingBottom: "1rem",
                  paddingTop: "1rem"
                }}
                onClick={() => this.openModal(0)}
              >
                &#43;&nbsp; New
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <ListGroup>
                <TransitionGroup>
                  <OrderListItem openModal={this.openModal} />
                </TransitionGroup>
              </ListGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Orders;
