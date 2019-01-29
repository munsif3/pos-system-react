import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Label,
  Container,
  FormGroup,
  Table
} from "reactstrap";
import { connect } from "react-redux";
import { getItems } from "../../actions/itemActions";
import ItemsList from "./ItemsList";
import DeleteItemButton from "../common/DeleteItemButton";
import ItemSelectBox from "../common/ItemSelectBox";
import UnitPriceField from "../common/UnitPriceField";
import QuantityField from "../common/QuantityField";

class OrderModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modal,
      selectedItem: "1",
      unitPrice: 0,
      unitPricePerItem: 0,
      selectedUnitPrice: 0
    };
  }

  totalPriceForItem = (unitPrice, qty) => {
    return unitPrice * qty;
  };

  totalPriceForOrder = totalPerItem => {
    return totalPerItem.reduce((accumulator, reducer) => accumulator + reducer);
  };

  passUnitPrice = unitPrice => {
    this.setState({ unitPrice });
  };

  // setUnitPrice = itemId => {
  //   this.state.selectedUnitPrice = this.props.items.reduce(
  //     item => item.item_id == itemId
  //   );
  // };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
    this.props.toggleModalState();
  };

  onSubmit = e => {
    e.preventDefault();
  };

  onChangeQty = e => {
    this.setState({
      unitPricePerItem: this.totalPriceForItem(
        this.state.unitPrice,
        e.target.value
      )
    });
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
                    items={this.props.items}
                    selectedItem={this.state.selectedItem}
                    onChangeQty={this.onChangeQty}
                    passUnitPrice={this.passUnitPrice}
                    unitPricePerItem={this.state.unitPricePerItem}
                  />

                  <tr className="new-row">
                    <td>{/* <DeleteItemButton /> */}</td>
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
                        selectedItem={this.state.selectedItem}
                        passUnitPrice={this.passUnitPrice}
                        currentItem={this.state.selectedItem}
                      />
                    </td>
                    <td>
                      <QuantityField qty={1} onChangeQty={this.onChangeQty} />
                    </td>
                    <td>{this.state.unitPricePerItem}</td>
                    <td>
                      <Button className="remove-btn" color="success" outline>
                        &#x2b;
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td />
                    <td />
                    <td />
                    <td />
                    <td>
                      <FormGroup>
                        <Label>Rs. 1200.00</Label>
                      </FormGroup>
                    </td>
                    <td />
                  </tr>
                </tbody>
              </Table>
              <Button
                className="float-right"
                color="primary"
                size="lg"
                style={{ marginTop: "2rem", width: "10vw" }}
                onClick={this.toggle}
              >
                Save
              </Button>
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
  { getItems }
)(OrderModal);
