import React, { Component } from "react";
import { getOrder } from "../../actions/orderActions";
import { connect } from "react-redux";
import DeleteItemButton from "../common/DeleteItemButton";
import ItemSelectBox from "../common/ItemSelectBox";
import UnitPriceField from "../common/UnitPriceField";
import QuantityField from "../common/QuantityField";

class ItemsList extends Component {
  componentDidMount() {
    this.props.getOrder(this.props.orderNo);
  }

  // unitPricePerItem = () => {
  //   return unitPrice * qty;
  // };

  render() {
    return this.props.orderItems.map(({ item_id, qty, unit_price }) => (
      <tr key={item_id}>
        <td>
          <DeleteItemButton />
        </td>
        <td>
          <ItemSelectBox items={this.props.items} currentItem={item_id} />
        </td>
        <td>
          <UnitPriceField
            items={this.props.items}
            passUnitPrice={this.props.passUnitPrice}
            currentItem={item_id}
          />
        </td>
        <td>
          <QuantityField qty={qty} onChangeQty={this.props.onChangeQty} />
        </td>
        <td>Rs. {unit_price * qty}</td>
        <td />
      </tr>
    ));
  }
}

const mapStateToProps = state => ({
  orderItems: state.order.orderItems
});

export default connect(
  mapStateToProps,
  { getOrder }
)(ItemsList);
