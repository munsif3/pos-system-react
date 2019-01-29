import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Container,
  Table
} from "reactstrap";
import { connect } from "react-redux";
import { getItems } from "../../actions/itemActions";
import {
  getOrder,
  updateQuantity,
  deleteItemFromOrder,
  addItemToOrder
} from "../../actions/orderActions";
import ItemsList from "./ItemsList";
import BillAmount from "../common/BillAmount";
import NewItemRow from "./NewItemRow";

class OrderModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modal,
      selectedItem: "1"
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
    const indexOfChangedQty = this.props.orderItems.findIndex(
      item => item["item_id"] == row
    );
    this.props.updateQuantity(indexOfChangedQty, qty);
  };

  onItemDelete = id => {
    this.props.deleteItemFromOrder(id);
  };

  onItemAdd = item => {
    this.props.addItemToOrder(item);
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
