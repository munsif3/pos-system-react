import React, { Component } from "react";
import { Container, Row, Col, Badge } from "reactstrap";
import { Link } from "react-router-dom";

class CreateError extends Component {
  state = {};
  render() {
    return (
      <Container>
        <Row style={{ marginBottom: "5rem" }}>
          <Col style={{ textAlign: "center" }}>
            <h1>
              <Badge color="danger">404</Badge> Incorrect Path
            </h1>
          </Col>
        </Row>
        <Row>
          <Col style={{ textAlign: "center" }}>
            <h3>Did you mean to visit the POS? </h3>
          </Col>
        </Row>
        <Row>
          <Col style={{ textAlign: "center" }}>
            <Link className="nav-link" to="/">
              <h3>OrderSys</h3>
            </Link>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default CreateError;
