import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Container,
  FormGroup,
  Label,
  Input,
  Table
} from "reactstrap";
import { connect } from "react-redux";
import { getItems } from "../../actions/itemActions";
import {
  updateQuantity,
  deleteItemFromOrder,
  addItemToOrder
} from "../../actions/orderActions";
import NewItemRow from "../order/NewItemRow";
import BillAmount from "../common/BillAmount";

class NewOrderModal extends Component {
  state = {
    modal: false,
    selectedItem: 1,
    changedQty: 0
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  totalPriceForOrder = () => {
    return 5200;
  };

  onChangeQty = (row, qty) => {
    this.setState({ changedQty: qty });
    // const indexOfChangedQty = this.props.orderItems.findIndex(
    //   item => item["item_id"] == row
    // );
    // this.props.updateQuantity(indexOfChangedQty, qty);
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

  componentDidMount() {
    this.props.getItems();
  }

  render() {
    return (
      <Container>
        <Button
          className="float-right"
          color="primary"
          size="lg"
          style={{
            marginTop: "2rem",
            paddingLeft: "3rem",
            paddingRight: "3rem",
            paddingBottom: "1rem",
            paddingTop: "1rem"
          }}
          onClick={this.toggle}
        >
          &#43;&nbsp; New
        </Button>
        <Modal size="lg" isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add New Order</ModalHeader>
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
                  <NewItemRow
                    items={this.props.items}
                    onChange={this.onItemChange}
                    selectedItem={this.state.selectedItem}
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
                  Save
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
  items: state.item.items
});

export default connect(
  mapStateToProps,
  { getItems, updateQuantity, deleteItemFromOrder, addItemToOrder }
)(NewOrderModal);
