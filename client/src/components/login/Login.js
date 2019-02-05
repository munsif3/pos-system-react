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
import classnames from "classnames";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";

class Login extends Component {
  state = {
    username: "",
    password: "",
    errors: {}
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const user = {
      username: this.state.username,
      password: this.state.password
    };
    this.props.loginUser(user, this.props.history);
  };

  componentDidUpdate(prevProps) {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
    if (this.props.errors !== prevProps.errors) {
      this.setState({ errors: this.props.errors });
    }
  }

  render() {
    const { errors } = this.state;
    const loginFormStyle = {
      backgroundColor: "#f9f9f9",
      border: "2px dashed #e5ac00",
      borderRadius: "10px",
      padding: "3rem"
    };

    return (
      <Container>
        <Row>
          <Col>
            <h1 className="heading">Sign In</h1>
          </Col>
        </Row>
        <Row>
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <Form
              onSubmit={this.handleSubmit}
              className="form login"
              style={loginFormStyle}
            >
              <FormGroup>
                <Label>Username</Label>
                <Input
                  type="text"
                  name="username"
                  id="username"
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.username
                  })}
                  onChange={this.handleInputChange}
                  value={this.state.username}
                />

                {errors.username && (
                  <div className="invalid-feedback">{errors.username}</div>
                )}
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.password
                  })}
                  onChange={this.handleInputChange}
                  value={this.state.password}
                />
                {errors.password && (
                  <div className="invalid-feedback">{errors.password}</div>
                )}
              </FormGroup>
              <br />
              <FormGroup className="text-center">
                <Button size="lg" color="warning" style={{ width: "20vw" }}>
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

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
