import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Container,
  FormGroup,
  Label,
  Input,
  Table
} from "reactstrap";
import { connect } from "react-redux";
import { getItems } from "../../actions/itemActions";

class OrderModal extends Component {
  state = {
    modal: this.props.modal
  };

  componentDidMount() {
    this.props.getItems();
  }

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  render() {
    const items = this.props.items.map(({ item_id, name, unit_price }) => (
      <option key={item_id}>{name}</option>
    ));

    return (
      <Container>
        <Button
          className="float-right"
          color="primary"
          size="lg"
          style={{ marginBottom: "2rem" }}
          onClick={this.toggle}
        >
          New &nbsp; &#43;
        </Button>

        <Modal size="lg" isOpen={this.state.modal}>
          <ModalHeader toggle={this.toggle}>Add New Order</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <Table responsive>
                <thead>
                  <tr>
                    <th />
                    <th>Item</th>
                    <th>Unit Price</th>
                    <th>Qty</th>
                    <th>Rs.</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>
                      <FormGroup>
                        <Input type="select" name="select" id="itemSelect">
                          {items}
                        </Input>
                      </FormGroup>
                    </td>
                    <td>15.00</td>
                    <td>
                      <Input
                        type="number"
                        name="qty"
                        id="qty"
                        style={{ width: "6vw" }}
                      />
                    </td>
                    <td>30.00</td>
                  </tr>

                  <tr>
                    <td />
                    <td />
                    <td />
                    <td />
                    <td>
                      <FormGroup>
                        <Label size="lg"> 50.00</Label>
                      </FormGroup>
                    </td>
                  </tr>
                </tbody>
              </Table>
              <Button
                className="float-right"
                color="primary"
                size="lg"
                style={{ marginTop: "2rem", width: "10vw" }}
              >
                Save
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  items: state.item.items
});

export default connect(
  mapStateToProps,
  { getItems }
)(OrderModal);
