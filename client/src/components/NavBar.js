import React, { Component } from "react";
import { Navbar, NavbarToggler, NavbarBrand, Container } from "reactstrap";

class AppNavBar extends Component {
  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="sm" className="mb-5">
          <Container>
            <NavbarBrand href="/">OrderSys</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
          </Container>
        </Navbar>
      </div>
    );
  }
}

export default AppNavBar;
