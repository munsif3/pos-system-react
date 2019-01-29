import React, { Component } from "react";
import { FormGroup, Label } from "reactstrap";

class BillAmount extends Component {
  state = {};
  render() {
    return (
      <FormGroup>
        <Label>
          <h3>Rs. {this.props.totalAmount}</h3>
        </Label>
      </FormGroup>
    );
  }
}

export default BillAmount;
