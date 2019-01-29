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
  addItemToOrder
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
    console.log("this.props.orderItems", this.props.orderItems);
    return this.props.orderItems.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.unit_price * currentValue.qty;
    }, 0);
  };

  onChangeQty = (row, qty) => {
    this.setState({ changedQty: qty });
    const indexOfChangedQty = this.props.orderItems.findIndex(
      item => item["item_id"] == row
    );
    this.props.updateQuantity(indexOfChangedQty, qty);
  };

  onItemDelete = id => {
    this.props.deleteItemFromOrder(id);
  };

  onItemAdd = (itemId, qty) => {
    this.props.addItemToOrder(itemId, qty);
  };

  onItemChange = e => {
    this.setState({ selectedItem: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
  };

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
        <Modal size="lg" isOpen={this.props.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            Order #{this.props.orderNo}
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
                    passUnitPrice={this.passUnitPrice}
                    onDelete={this.onItemDelete}
                  />

                  <NewItemRow
                    items={this.props.items}
                    onChange={this.onItemChange}
                    selectedItem={this.state.selectedItem}
                    passUnitPrice={this.passUnitPrice}
                    currentItem={this.state.selectedItem}
                    onChangeQty={this.onChangeQty}
                    changedQty={this.state.changedQty}
                    onItemAdd={this.onItemAdd}
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
                  onClick={this.toggle}
                >
                  Update
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
  { getItems, getOrder, updateQuantity, deleteItemFromOrder, addItemToOrder }
)(OrderModal);
