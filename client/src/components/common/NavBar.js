import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  Row,
  Col,
  Button
} from "reactstrap";

class AppNavBar extends Component {
  state = {
    collapsed: false
  };

  onLogout = e => {
    e.preventDefault();
    this.props.logoutUser(this.props.history);
  };

  toggleNavbar = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    const createAvatar = (
      <div className="avatar round">
        <h3>
          <b>
            {localStorage.username
              ? localStorage.username.charAt(0).toUpperCase()
              : "U"}
          </b>
        </h3>
      </div>
    );

    const authLinks = (
      <div>
        <Row>
          <Col style={{ marginTop: "5vh" }}>
            <Link className="navbar-brand mr-auto" to="/">
              OrderSys
            </Link>
          </Col>
          <Col style={{ marginLeft: "80vw" }}>{createAvatar}</Col>
        </Row>
        <Row>
          <Col style={{ marginLeft: "89vw" }}>
            <Collapse isOpen={!this.state.collapsed} navbar>
              <Nav navbar>
                <NavItem>
                  <Button
                    color="link"
                    className="nav-link float-right"
                    onClick={this.onLogout}
                  >
                    Logout
                  </Button>
                </NavItem>
              </Nav>
            </Collapse>
          </Col>
        </Row>
        <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
      </div>
    );

    const guestLinks = (
      <div>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <Link className="nav-link float-right" to="/login">
              Sign In
            </Link>
          </NavItem>
        </Nav>
      </div>
    );

    return (
      <div>
        <Navbar expand="md" className="mb-5" color="dark">
          {this.props.auth.isAuthenticated ? authLinks : guestLinks}
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(withRouter(AppNavBar));
