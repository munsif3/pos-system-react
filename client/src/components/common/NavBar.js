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
  Button
} from "reactstrap";

class AppNavBar extends Component {
  state = {
    isOpen: false
  };

  onLogout = e => {
    e.preventDefault();
    this.props.logoutUser(this.props.history);
  };

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const authLinks = (
      <div>
        <Link className="navbar-brand" to="/">
          OrderSys
        </Link>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
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
      <Navbar expand="sm" className="mb-5" color="dark">
        {this.props.auth.isAuthenticated ? authLinks : guestLinks}
      </Navbar>
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
