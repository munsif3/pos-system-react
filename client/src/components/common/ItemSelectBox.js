import React, { Component } from "react";
import { FormGroup, Input, Label } from "reactstrap";

class ItemSelectBox extends Component {
  render() {
    return (
      <FormGroup>
        {this.props.currentItem ? (
          this.props.items
            .filter(item => item["item_id"] === Number(this.props.currentItem))
            .map(({ item_id, name }) => (
              <Label key={item_id} value={item_id}>
                {name}
              </Label>
            ))
        ) : (
          <Input
            type="select"
            name="select"
            id="itemSelect"
            onChange={this.props.onChange}
          >
            {this.props.items.map(({ item_id, name }) => (
              <option key={item_id} value={item_id}>
                {name}
              </option>
            ))}
          </Input>
        )}
      </FormGroup>
    );
  }
}

export default ItemSelectBox;
