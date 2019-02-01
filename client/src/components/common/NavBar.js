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
        <Link className="navbar-brand sys-name" to="/">
          OrderSys
        </Link>
        <div className="avatar-holder">{createAvatar}</div>
        <Collapse
          isOpen={!this.state.collapsed}
          style={{ float: "right" }}
          navbar
        >
          <Nav className="nav-link mr-auto" navbar>
            <NavItem>
              <Button
                className="btn-logout"
                color="link"
                onClick={this.onLogout}
              >
                Logout
              </Button>
            </NavItem>
          </Nav>
        </Collapse>
        <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
      </div>
    );

    const guestLinks = (
      <div>
        <Nav className="ml-auto sign-in-nav" navbar>
          <div
            className="collapse navbar-collapse justify-content-between"
            id="navbar"
          >
            <div className="navbar-nav nav-link">
              <NavItem>
                <Link className="nav-item nav-link" to="/">
                  OrderSys
                </Link>
              </NavItem>
            </div>
            <div className="navbar-nav nav-link">
              <NavItem>
                <Link className="nav-item nav-link" to="/login">
                  Sign In
                </Link>
              </NavItem>
            </div>
          </div>
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
