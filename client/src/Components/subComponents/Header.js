import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';

require("react-bootstrap/lib/NavbarHeader")

// <Navbar>
//   <Navbar.Header>
//     <Navbar.Brand>
//       <a href='#home'>APP-etite</a>
//     <Navbar.Brand>
//   <Navbar.Header>
// <Nav>
//   <NavItem eventKey={1} href="#">
// My Account
// </NavItem>
//   <NavDropdown eventKey={2} title="MENU" id="basic-nav-dropdown">
//     <MenuItem eventKey={2.1}>Favorites</MenuItem>
//     <MenuItem eventKey={2.2}>Log Out </MenuItem>
//   </NavDropdown>
// </Nav>
// </Navbar>;

import SearchBar from '../SearchBar'
//import { Button } from 'reactstrap';

const Header = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/main">
          Home
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="#">
                My Favorites
              </Link>
              <span className="sr-only">(current)</span>
            </li>{' '}
            <li className="nav-item">
              <Link className="nav-link" to="#">
                Friends
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">
                Search
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">
                ...
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    
    <SearchBar />
</div>

  );
};

export default Header;
