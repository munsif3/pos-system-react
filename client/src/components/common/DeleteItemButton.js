import React from "react";
import { Button } from "reactstrap";

const DeleteItemButton = () => {
  return (
    <Button className="remove-btn" color="danger" outline>
      &times;
    </Button>
  );
};

export default DeleteItemButton;
