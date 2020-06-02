import React, { Component } from 'react';
import { BrowserRouter , Route, Switch, Link , Redirect} from "react-router-dom";
import SocietySidebar from './societySidebar';
import Auth from "./../login/auth";

class SocietyAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        if(localStorage.getItem("role") === "\"admin\"")
        return ( <React.Fragment><SocietySidebar/><div>user Dashboard</div>
        <Link to ="/logout" >Logout</Link>
         </React.Fragment>);
         else return(<Redirect to="/"/>)
    }
}
export default SocietyAdmin;