import React, { Component } from "react";
import { FormGroup, Label } from "reactstrap";

class TotalPriceForItem extends Component {
  render() {
    return (
      <FormGroup>
        <Label>Rs. {this.props.unitPrice * this.props.qty}</Label>
      </FormGroup>
    );
  }
}

export default TotalPriceForItem;
