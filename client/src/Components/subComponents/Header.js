import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';

const Header = () => {
	return (
		<BrowserRouter>
         <nav className="navbar navbar-expand-lg navbar-light bg-light">
             <Link className="navbar-brand" to="/main">Home</Link>
             <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
               <span className="navbar-toggler-icon"></span>
             </button>
             <div className="collapse navbar-collapse" id="navbarNav">
               <ul className="navbar-nav ml-auto">
                 <li className="nav-item">
                   <Link className="nav-link" to="#">My Favorites</Link><span class="sr-only">(current)</span>
                 </li>                  <li class="nav-item">
                   <Link className="nav-link" to="#">Friends</Link>
                 </li>
                 <li className="nav-item">
                   <Link className="nav-link" to="#">Search</Link>
                 </li>
                 <li className="nav-item">
                   <Link className="nav-link" to="#">...</Link>
                 </li>
               </ul>
             </div>
         </nav>
			 </BrowserRouter>
	)
}

export default Header;
