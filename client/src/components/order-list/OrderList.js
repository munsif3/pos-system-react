import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Row, Col } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getOrders } from "../../actions/orderActions";

class OrderList extends Component {
  componentWillMount() {
    this.props.getOrders();
  }

  formatDate = date => {
    return date.slice(0, 19).replace("T", " ");
  };

  render() {
    const orders = this.props.orders.map(
      ({ order_no, total_price, created_at }) => (
        <CSSTransition key={order_no} timeout={400} classNames="fade">
          <ListGroupItem tag="a" action onClick={this.toggle}>
            <Row style={{ margin: "1rem" }}>
              <Col>
                <h4>Order #{order_no}</h4>
                <small>{this.formatDate(created_at)}</small>
              </Col>
              <Col>
                <h4 className="float-right">Rs. {total_price}</h4>
              </Col>
            </Row>
          </ListGroupItem>
        </CSSTransition>
      )
    );

    return (
      <Container>
        <Row style={{ marginBottom: "5rem" }}>
          <Col style={{ textAlign: "center" }}>
            <h1>Pending Orders</h1>
          </Col>
        </Row>
        <ListGroup>
          <TransitionGroup>{orders}</TransitionGroup>
        </ListGroup>
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
