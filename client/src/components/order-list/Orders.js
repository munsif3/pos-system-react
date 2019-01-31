import React, { Component } from "react";
import { Container, ListGroup, Row, Col, Button } from "reactstrap";
import { TransitionGroup } from "react-transition-group";
import OrderListItem from "./OrderListItem";
import OrderModal from "../order/OrderModal";
import { connect } from "react-redux";
import { getOrders } from "../../actions/orderActions";

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

  componentDidMount() {
    this.props.getOrders();
  }

  render() {
    return (
      <Container>
        <Row style={{ marginBottom: "3rem" }}>
          <Col style={{ textAlign: "center" }}>
            <h1>Pending Orders</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <ListGroup>
              <TransitionGroup>
                <OrderListItem
                  openModal={this.openModal}
                  orders={this.props.orders}
                />
              </TransitionGroup>
            </ListGroup>
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
              color="success"
              size="lg"
              style={{
                marginTop: "2rem",
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
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  orders: state.order.orders
});

export default connect(
  mapStateToProps,
  { getOrders }
)(Orders);
