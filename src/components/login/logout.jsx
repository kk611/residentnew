import React, { Component } from 'react';
import Auth from "./auth";
import { BrowserRouter , Route, Switch, Link , Redirect} from "react-router-dom";

class Logout extends Component {
    constructor(props){
    super(props)
    localStorage.removeItem("login");
    localStorage.removeItem("role");
    Auth.logout();
    }
    render() { 
        return (<React.Fragment><div><Redirect to = "/"/></div> 
            </React.Fragment>  );

    }
}
 
export default Logout;