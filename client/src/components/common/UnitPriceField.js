import React, { Component } from "react";
import { Label } from "reactstrap";

class UnitPriceField extends Component {
  render() {
    return this.props.items
      .filter(item => item["item_id"] === Number(this.props.currentItem))
      .map(({ unit_price }) => (
        <Label key={this.props.currentItem}>{unit_price}</Label>
      ));
  }
}

export default UnitPriceField;
