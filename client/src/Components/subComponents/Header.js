import React from 'react';
import { BrowserRouter} from 'react-router-dom';
import SearchBar from '../SearchBar'
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

const Header = () => {
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
          </ul>

      </nav>

    <SearchBar />
</div>

  );
};

export default Header;
