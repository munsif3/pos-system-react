import React, { Component } from "react";
import {
  Container,
  Form,
  Col,
  Row,
  FormGroup,
  Label,
  Input,
  Jumbotron,
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
        <Jumbotron>
          <Form className="form">
            <FormGroup>
              <Label>Username</Label>
              <Input
                type="text"
                name="username"
                id="username"
                placeholder="username"
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="********"
              />
            </FormGroup>

            <br />

            <Button size="lg" color="dark" block>
              Submit
            </Button>
          </Form>
        </Jumbotron>
      </Container>
    );
  }
}

export default Login;
