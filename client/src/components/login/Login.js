import React, { Component } from "react";
import {
  Container,
  Form,
  Col,
  Row,
  FormGroup,
  Label,
  Input,
  Button
} from "reactstrap";

class Login extends Component {
  state = {};
  render() {
    return (
      <Container>
        <Row style={{ marginBottom: "5rem" }}>
          <Col style={{ textAlign: "center" }}>
            <h1>Sign In</h1>
          </Col>
        </Row>
        <Row>
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <Form
              className="form login"
              style={{
                border: "1px solid ",
                borderRadius: "10px",
                padding: "3rem"
              }}
            >
              <FormGroup>
                <Label>Username</Label>
                <Input type="text" name="username" id="username" />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input type="password" name="password" id="password" />
              </FormGroup>
              <br />
              <FormGroup className="text-center">
                <Button size="lg" color="warning" style={{ width: "20rem" }}>
                  Login
                </Button>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Login;
