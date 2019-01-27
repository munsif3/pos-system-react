import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";

class CreateError extends Component {
  state = {};
  render() {
    return (
      <Container>
        <Row style={{ marginBottom: "5rem" }}>
          <Col style={{ textAlign: "center" }}>
            <h1>404 Incorrect Path</h1>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default CreateError;
