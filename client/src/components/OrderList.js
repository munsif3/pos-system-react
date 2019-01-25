import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getOrders } from "../actions/orderActions";

class OrderList extends Component {
  componentWillMount() {
    this.props.getOrders();
  }

  render() {
    return (
      <Container>
        <ListGroup>
          <TransitionGroup className="order-list">
            <CSSTransition timeout={500} classNames="fade">
              <ListGroupItem>*</ListGroupItem>
            </CSSTransition>
          </TransitionGroup>
        </ListGroup>
        <br />
        <Button color="success">Add New Order &nbsp; &#43;</Button>
      </Container>
    );
  }
}

export default connect(
  null,
  { getOrders }
)(OrderList);
