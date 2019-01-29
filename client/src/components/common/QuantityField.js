import React, { Component } from "react";
import { Input } from "reactstrap";

class QuantityField extends Component {
  render() {
    return (
      <Input
        type="number"
        name="qty"
        id="qty"
        defaultValue={this.props.qty}
        onChange={e => this.props.onChangeQty(this.props.row, e.target.value)}
        style={{ width: "10vw" }}
      />
    );
  }
}

export default QuantityField;
