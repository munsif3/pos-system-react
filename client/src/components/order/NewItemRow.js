import React, { Component } from "react";
import { Button } from "reactstrap";
import ItemSelectBox from "../common/ItemSelectBox";
import UnitPriceField from "../common/UnitPriceField";
import QuantityField from "../common/QuantityField";

class NewItemRow extends Component {
  render() {
    return (
      <tr className="new-row">
        <td />
        <td>
          <ItemSelectBox
            items={this.props.items}
            selectedItem={this.props.selectedItem}
            onChange={this.props.onChange}
          />
        </td>
        <td>
          <UnitPriceField
            items={this.props.items}
            passUnitPrice={this.props.passUnitPrice}
            currentItem={this.props.selectedItem}
          />
        </td>
        <td>
          <QuantityField qty={1} onChangeQty={this.props.onChangeQty} />
        </td>
        <td>Rs. Price</td>
        <td>
          <Button
            color="success"
            onClick={() =>
              this.props.onItemAdd(
                this.props.selectedItem,
                this.props.changedQty
              )
            }
            outline
          >
            &#x2b;
          </Button>
        </td>
      </tr>
    );
  }
}

export default NewItemRow;
