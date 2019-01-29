import React, { Component } from "react";
// import { getOrder } from "../../actions/orderActions";
// import { connect } from "react-redux";
import DeleteItemButton from "../common/DeleteItemButton";
import ItemSelectBox from "../common/ItemSelectBox";
import UnitPriceField from "../common/UnitPriceField";
import QuantityField from "../common/QuantityField";

class ItemsList extends Component {
  // state = {
  //   orderAmount: 0
  // };

  // calculateTotalAmountForItem = (unitPrice, qty) => {
  //   let tot = unitPrice * qty;
  //   // this.setState({ orderAmount: (this.state.orderAmount += tot) });
  //   return tot;
  // };

  // componentDidMount() {
  //   this.props.getOrder(this.props.orderNo);
  // }

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

// const mapStateToProps = state => ({
//   orderItems: state.order.orderItems
// });

// export default connect(
//   mapStateToProps,
//   { getOrder }
// )(ItemsList);

export default ItemsList;

//this.calculateTotalAmountForItem(unit_price, qty)
