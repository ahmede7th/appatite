import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
	return (
         <nav className="navbar navbar-expand-lg navbar-light bg-light">
             <Link class="navbar-brand" to="/main">Home</Link>
             <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
               <span class="navbar-toggler-icon"></span>
             </button>
             <div className="collapse navbar-collapse" id="navbarNav">
               <ul class="navbar-nav ml-auto">
                 <li class="nav-item">
                   <Link class="nav-link" to="#">My Favorites</Link><span class="sr-only">(current)</span>
                 </li>                  <li class="nav-item">
                   <Link class="nav-link" to="#">Friends</Link>
                 </li>
                 <li class="nav-item">
                   <Link class="nav-link" to="#">Search</Link>
                 </li>
                 <li class="nav-item">
                   <Link class="nav-link" to="#">...</Link>
                 </li>
               </ul>
             </div>
         </nav>
	)
}

export default Header;