import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
require("react-bootstrap/lib/NavbarHeader")

<Navbar>
  <Navbar.Header>
    <Navbar.Brand>
      <a href='#home'>APP-etite</a>
    <Navbar.Brand>
  <Navbar.Header>
<Nav>
  <NavItem eventKey={1} href="#">
My Account
</NavItem>
  <NavDropdown eventKey={2} title="MENU" id="basic-nav-dropdown">
    <MenuItem eventKey={2.1}>Favorites</MenuItem>
    <MenuItem eventKey={2.2}>Log Out </MenuItem>
  </NavDropdown>
</Nav>
</Navbar>;

export default Header;
