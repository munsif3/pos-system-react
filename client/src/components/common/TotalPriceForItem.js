import React, { Component } from "react";
import { FormGroup, Label } from "reactstrap";

class TotalPriceForItem extends Component {
  render() {
    return (
      <FormGroup>
        {/* {this.props.items
          .filter(({ item_id }) => item_id == this.props.row)
          .map((qty, unit_price) => (
            <Label>Rs. {qty * unit_price}</Label>
          ))} */}

        <Label>Rs. {this.props.unitPrice * this.props.qty}</Label>
      </FormGroup>
    );
  }
}

export default TotalPriceForItem;
