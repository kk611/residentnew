import React, { Component } from 'react';
import "./App.scss";
import App from "./App";
import { Login, Register } from "./components/login/index";
import { BrowserRouter  , Route, Switch, Link , Redirect, Router} from "react-router-dom";
import Admin from "../src/components/admin/admin"
import Logout from './components/login/logout';
import User from './components/user/user';
import SocietyAdmin from './components/societyAdmin/societyAdmin';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() { 
        return (
            <BrowserRouter>
      <Switch>
        <Route exact path="/"> 
        <App/>
        </Route>
        <Route exact path="/admin">
        <Admin/>
        </Route>
        </Switch>
        <Route exact path="/logout">
            <Logout/>
        </Route>
        <Route exact path="/user">
            <User/>
        </Route>
        <Route exact path="/Societyadmin">
            <SocietyAdmin/>
        </Route>
        </BrowserRouter>
         );
    }
}
 
export default Home;