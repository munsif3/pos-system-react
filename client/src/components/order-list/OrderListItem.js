import React, { Component } from "react";
import { ListGroupItem, Row, Col, Badge, Button } from "reactstrap";
import { CSSTransition } from "react-transition-group";

class OrderListItem extends Component {
  formatDate = date => {
    return date.slice(0, 19).replace("T", " ");
  };

  closeOrder = e => {
    e.stopPropagation();
    // call update order status function
    // add redux
  };

  render() {
    return (
      <div className="order-list">
        {this.props.orders.map(({ order_no, total_price, created_at }) => (
          <CSSTransition key={order_no} timeout={500} classNames="fade">
            <ListGroupItem
              onClick={() => this.props.openModal(order_no)}
              action
            >
              <Row style={{ margin: "1rem" }}>
                <Col>
                  <h2>
                    <Badge color="warning">Order #{order_no}</Badge>
                  </h2>
                </Col>
                <Col>
                  <h3 className="float-right">Rs. {total_price}</h3>
                </Col>
              </Row>
              <Row style={{ margin: "1rem" }}>
                <Col>
                  <small className="row-date">
                    <b>{this.formatDate(created_at)}</b>
                  </small>
                </Col>
                <Col>
                  <Button
                    className="float-right"
                    color="secondary"
                    style={{ borderRadius: "15px" }}
                    onClick={this.closeOrder}
                  >
                    Close Order
                  </Button>
                </Col>
              </Row>
            </ListGroupItem>
          </CSSTransition>
        ))}
      </div>
    );
  }
}

export default OrderListItem;
