import React, { Component } from "react";
import { Input } from "reactstrap";

class QuantityField extends Component {
  render() {
    return (
      <Input
        min="1"
        max="3"
        type="number"
        value={this.props.qty}
        onChange={e => this.props.onChangeQty(this.props.row, e.target.value)}
        style={{ width: "5rem" }}
      />
    );
  }
}

export default QuantityField;
