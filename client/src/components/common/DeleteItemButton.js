import React from "react";
import { Button } from "reactstrap";

const DeleteItemButton = props => {
  return (
    <Button
      className="remove-btn"
      color="danger"
      outline
      onClick={() => {
        props.onDelete(props.currentOrder, props.currentItem);
      }}
    >
      &times;
    </Button>
  );
};

export default DeleteItemButton;
