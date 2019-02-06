import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Collapse, Navbar, NavbarToggler, Button } from "reactstrap";

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
        <Collapse
          isOpen={!this.state.collapsed}
          style={{ float: "right" }}
          navbar
        >
          <div className="navbar-nav nav-link">
            <div className="avatar-holder">{createAvatar}</div>
            <div style={{ float: "right" }}>
              <Button className="btn-sign" color="link" onClick={this.onLogout}>
                Logout
              </Button>
            </div>
          </div>
        </Collapse>
        <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
      </div>
    );

    const guestLinks = (
      <div>
        <Link className="navbar-brand sys-name" to="/">
          OrderSys
        </Link>
      </div>
    );

    return (
      <div>
        <Navbar expand="md" className="mb-5 navbar-new" color="dark">
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
