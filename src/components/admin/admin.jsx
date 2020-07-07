import React, { Component } from 'react';
import Auth from "../login/auth";
import Logout from "../login/logout";
import { BrowserRouter , Route, Switch, Link , Redirect} from "react-router-dom";
import Sidebar from "./sidebar/sidebar";

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        if(localStorage.getItem("role") === "\"superadmin\"")
        return ( <React.Fragment><Sidebar/>
         </React.Fragment>);
         else return(<Redirect to="/"/>)
    }
}
 
export default Admin;