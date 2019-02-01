import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Container,
  Table
} from "reactstrap";
import {
  getOrder,
  updateQuantity,
  deleteItemFromOrder,
  addItemToOrder,
  updateOrder,
  addNewOrder
} from "../../actions/orderActions";
import { getItems } from "../../actions/itemActions";
import ItemsList from "./ItemsList";
import NewItemRow from "./NewItemRow";
import BillAmount from "../common/BillAmount";

class OrderModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modal,
      selectedItem: "1",
      changedQty: 0
    };
  }

  toggle = () => {
    this.setState({ modal: !this.state.modal });
    this.props.toggleModalState();
  };

  totalPriceForOrder = () => {
    return this.props.orderItems.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.unit_price * currentValue.qty;
    }, 0);
  };

  onChangeQty = (row, qty) => {
    this.setState({ changedQty: Number(qty) });
    const indexOfChangedQty = this.props.orderItems.findIndex(
      item => item["item_id"] === Number(row)
    );
    this.props.updateQuantity(indexOfChangedQty, qty);
  };

  onItemDelete = (orderId, itemId) => {
    this.props.deleteItemFromOrder(orderId, itemId);
  };

  onItemAdd = (itemId, qty) => {
    this.props.addItemToOrder(itemId, qty);
  };

  onItemChange = e => {
    this.setState({ selectedItem: e.target.value });
  };

  onUpdateOrder = shouldToggle => {
    this.props.updateOrder(
      this.props.orderItems,
      this.props.orderNo,
      this.totalPriceForOrder()
    );
    if (shouldToggle) this.toggle();
  };

  onSaveNewOrder = () => {
    this.props.addNewOrder(this.props.orderItems);
    this.toggle();
  };

  onSubmit = e => {
    e.preventDefault();
  };

  doNothing = () => {};

  componentDidMount() {
    this.props.getItems();
  }

  componentDidUpdate(prevProps) {
    if (this.props.orderNo !== prevProps.orderNo) {
      this.props.getOrder(this.props.orderNo);
    }
  }

  render() {
    return (
      <Container>
        <Modal
          centered
          size="lg"
          isOpen={this.props.modal}
          toggle={this.toggle}
          onClosed={
            this.props.orderNo !== 0
              ? () => this.onUpdateOrder(false)
              : this.doNothing()
          }
        >
          <ModalHeader toggle={this.toggle}>
            {this.props.orderNo === 0
              ? "Add New Order"
              : "Order #" + this.props.orderNo}
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <Table responsive>
                <thead>
                  <tr>
                    <th />
                    <th>Item</th>
                    <th>Unit Price</th>
                    <th>Qty</th>
                    <th>Rs.</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  <ItemsList
                    orderNo={this.props.orderNo}
                    orderItems={this.props.orderItems}
                    items={this.props.items}
                    selectedItem={this.state.selectedItem}
                    onChangeQty={this.onChangeQty}
                    onDelete={this.onItemDelete}
                  />

                  <NewItemRow
                    items={this.props.items}
                    onChange={this.onItemChange}
                    selectedItem={this.state.selectedItem}
                    currentItem={this.state.selectedItem}
                    onChangeQty={this.onChangeQty}
                    changedQty={this.state.changedQty}
                    onItemAdd={this.onItemAdd}
                    isNew={false}
                  />
                </tbody>
              </Table>
              <div className="text-center">
                <BillAmount totalAmount={this.totalPriceForOrder()} />
              </div>
              <div className="text-center">
                <Button
                  color="primary"
                  size="lg"
                  style={{ marginTop: "2rem", width: "14rem" }}
                  onClick={
                    this.props.orderNo === 0
                      ? this.onSaveNewOrder
                      : this.onUpdateOrder
                  }
                >
                  {this.props.orderNo === 0 ? "Save" : "Update"}
                </Button>
              </div>
            </Form>
          </ModalBody>
        </Modal>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  items: state.item.items,
  orderItems: state.order.orderItems
});

export default connect(
  mapStateToProps,
  {
    getItems,
    getOrder,
    updateQuantity,
    deleteItemFromOrder,
    addItemToOrder,
    updateOrder,
    addNewOrder
  }
)(OrderModal);
