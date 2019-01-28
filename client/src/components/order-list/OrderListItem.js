import React, { Component } from "react";
import { ListGroupItem, Row, Col } from "reactstrap";
import { CSSTransition } from "react-transition-group";
import { connect } from "react-redux";
import { getOrders } from "../../actions/orderActions";
import OrderModal from "../order/OrderModal";

class OrderListItem extends Component {
  state = {
    modal: false,
    orderNo: 0
  };

  componentDidMount() {
    this.props.getOrders();
  }

  formatDate = date => {
    return date.slice(0, 19).replace("T", " ");
  };

  openModal = orderNo => {
    this.setState({ modal: !this.state.modal, orderNo: orderNo });
  };

  toggleModalState = () => {
    this.setState({ modal: !this.state.modal });
  };

  render() {
    return (
      <div>
        {this.props.orders.map(({ order_no, total_price, created_at }) => (
          <CSSTransition key={order_no} timeout={600} classNames="fade">
            <ListGroupItem
              onClick={() => this.openModal(order_no)}
              tag="a"
              action
            >
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
        ))}
        <OrderModal
          toggleModalState={this.toggleModalState}
          orderNo={this.state.orderNo}
          modal={this.state.modal}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  orders: state.order.orders
});

export default connect(
  mapStateToProps,
  { getOrders }
)(OrderListItem);
