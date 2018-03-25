import React from 'react';
import { BrowserRouter} from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import TokenService from '../../Auth/Services/TokenService';
import SearchBar from '../SearchBar';
import { Link } from 'react-router-dom';
import {Collapse, Button, CardBody, Card} from 'reactstrap';

const refresh = () => {
  window.location.reload()
}

const Header = (props) => {
  return (
    <div className="header">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/main">
          Home
        </Link>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/user/myreviews">
                My Reviews
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/user/account">
                My Account
              </Link>
            </li>
            <li className="nav-item">
              <Button outline="outline" color="danger" onClick={props.logout}>LogOut</Button>
            </li>
          </ul>
      </nav>
</div>

  );
};

export default Header;
