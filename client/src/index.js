import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Auth from './Auth/Auth';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Auth />, document.getElementById('root'));
registerServiceWorker();


//REFACTOR TO HAVE A ReactDOM.render(<Routers />) AND HAVE ALL ROUTERS
//THERE WRAPPED IN ONE MAJOR BROWSER ROUTERS
//AND FROM THERE YOU CAN EITHER RENDER THE HOME PAGE
//OR THE LOGIN PAGE DEPENDING
