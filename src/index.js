import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter  , Route, Switch, Link , Redirect, Router} from "react-router-dom";
import Home from './home';
import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap";

ReactDOM.render(<BrowserRouter><Home/></BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
