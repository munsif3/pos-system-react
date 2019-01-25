import React, { Component } from "react";
import {
  Container,
  ListGroup,
  ListGroupItem,
  Button,
  Badge,
  Row,
  Col
} from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getOrders } from "../actions/orderActions";

class OrderList extends Component {
  componentWillMount() {
    this.props.getOrders();
  }

  onClick = id => {
    prompt("Add New Order", "Add Items");
  };

  formatDate = date => {
    return date.slice(0, 19).replace("T", " ");
  };

  render() {
    const orders = this.props.orders.map(
      ({ order_no, total_price, created_at }) => (
        <CSSTransition key={order_no} timeout={500} classNames="fade">
          <ListGroupItem tag="a" action>
            <Row>
              <Col>
                <h4>Order #{order_no}</h4>
                <small>{this.formatDate(created_at)}</small>
              </Col>
              <Col>
                <h4 className="float-right">${total_price}</h4>
              </Col>
            </Row>
            {/*<Button
                className="remove-btn float-right"
                color="success"
                onClick={this.onClick.bind(this, order_no)} >Paid &nbsp; &#10003;</Button> */}
          </ListGroupItem>
        </CSSTransition>
      )
    );

    return (
      <Container>
        <Row>
          <Col style={{ textAlign: "center" }}>
            <h1>Pending Orders</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <ListGroup flush>
              <TransitionGroup className="order-list">{orders}</TransitionGroup>
            </ListGroup>
          </Col>
        </Row>
        <br />
        <Button
          className="float-right"
          color="primary"
          size="lg"
          onClick={this.onClick}
        >
          Add New Order &nbsp; &#43;
        </Button>
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
)(OrderList);
