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
  deleteItemFromOrder
} from "../../actions/orderActions";
import ItemsList from "./ItemsList";
import ItemSelectBox from "../common/ItemSelectBox";
import UnitPriceField from "../common/UnitPriceField";
import QuantityField from "../common/QuantityField";
import BillAmount from "../common/BillAmount";

class OrderModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modal,
      selectedItem: "1",
      changedQty: 0,
      changedRow: 0
    };
  }

  totalPriceForOrder = () => {
    return this.props.orderItems.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.unit_price * currentValue.qty;
    }, 0);
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
    this.props.toggleModalState();
  };

  onSubmit = e => {
    e.preventDefault();
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

  onItemChange = e => {
    this.setState({ selectedItem: e.target.value });
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
                    row={this.state.changedRow}
                    orderNo={this.props.orderNo}
                    orderItems={this.props.orderItems}
                    items={this.props.items}
                    selectedItem={this.state.selectedItem}
                    onChangeQty={this.onChangeQty}
                    passUnitPrice={this.passUnitPrice}
                    onDelete={this.onItemDelete}
                  />

                  <tr className="new-row">
                    <td />
                    <td>
                      <ItemSelectBox
                        items={this.props.items}
                        selectedItem={this.state.selectedItem}
                        onChange={this.onItemChange}
                      />
                    </td>
                    <td>
                      <UnitPriceField
                        items={this.props.items}
                        passUnitPrice={this.passUnitPrice}
                        currentItem={this.state.selectedItem}
                      />
                    </td>
                    <td>
                      <QuantityField qty={1} onChangeQty={this.onChangeQty} />
                    </td>
                    <td>Rs. </td>
                    <td>
                      <Button className="remove-btn" color="success" outline>
                        &#x2b;
                      </Button>
                    </td>
                  </tr>
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
  { getItems, getOrder, updateQuantity, deleteItemFromOrder }
)(OrderModal);
