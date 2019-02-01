import React, { Component } from "react";
import DeleteItemButton from "../common/DeleteItemButton";
import ItemSelectBox from "../common/ItemSelectBox";
import UnitPriceField from "../common/UnitPriceField";
import QuantityField from "../common/QuantityField";
import TotalPriceForItem from "../common/TotalPriceForItem";

class ItemsList extends Component {
  render() {
    return this.props.orderItems.map(({ item_id, qty, unit_price }) => (
      <tr key={item_id}>
        <td>
          <DeleteItemButton
            currentOrder={this.props.orderNo}
            currentItem={item_id}
            onDelete={this.props.onDelete}
          />
        </td>
        <td>
          <ItemSelectBox items={this.props.items} currentItem={item_id} />
        </td>
        <td>
          <UnitPriceField items={this.props.items} currentItem={item_id} />
        </td>
        <td>
          <QuantityField
            qty={qty}
            onChangeQty={this.props.onChangeQty}
            row={item_id}
          />
        </td>
        <td>
          <TotalPriceForItem
            items={this.props.items}
            unitPrice={unit_price}
            qty={qty}
            row={item_id}
          />
        </td>
        <td />
      </tr>
    ));
  }
}

export default ItemsList;
