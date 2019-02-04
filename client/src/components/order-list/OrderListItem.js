import React, { Component } from "react";
import { ListGroupItem, Row, Col, Badge } from "reactstrap";
import { CSSTransition } from "react-transition-group";

class OrderListItem extends Component {
  formatDate = date => {
    // a.split("T")[0]+ " " +a.split("T")[1].slice(0,-5)
    return date.slice(0, 16).replace("T", " ");
  };

  render() {
    return (
      <div style={{ height: "60vh", overflow: "auto" }}>
        {this.props.orders.map(({ order_no, total_price, created_at }) => (
          <CSSTransition key={order_no} timeout={500} classNames="fade">
            <ListGroupItem
              onClick={() => this.props.openModal(order_no)}
              tag="a"
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
              <Row>
                <Col>
                  <small className="row-date">
                    <b>{this.formatDate(created_at)}</b>
                  </small>
                </Col>
                <Col />
              </Row>
            </ListGroupItem>
          </CSSTransition>
        ))}
      </div>
    );
  }
}

export default OrderListItem;
