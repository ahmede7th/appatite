import React from 'react';
import { BrowserRouter} from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import TokenService from '../../Auth/Services/TokenService';
import SearchBar from '../SearchBar';
import { Link } from 'react-router-dom';
import {Collapse, Button, CardBody, Card} from 'reactstrap';

const Header = (props) => {
  return (
    <div>
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
              <Link className="nav-link" to="/user/myfavorites">
                My Favorites
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/user/account">
                My Account
              </Link>
            </li>
            <li className="nav-item">
              <button onClick={props.logout}>LogOut</button>
            </li>
          </ul>
      </nav>
</div>

  );
};

export default Header;
