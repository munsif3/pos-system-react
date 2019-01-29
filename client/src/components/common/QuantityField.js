import React, { Component } from "react";
import { Input } from "reactstrap";

class QuantityField extends Component {
  render() {
    return (
      <Input
        type="number"
        name="qty"
        id="qty"
        value={this.props.qty}
        style={{ width: "10vw" }}
        onChange={this.props.onChangeQty}
      />
    );
  }
}

export default QuantityField;
