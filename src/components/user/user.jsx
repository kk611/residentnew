import React, { Component } from 'react';
import { BrowserRouter , Route, Switch, Link , Redirect} from "react-router-dom";

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        if(localStorage.getItem("role") === "\"resident\"")
        return ( <React.Fragment><div>user Dashboard</div>
        <Link to ="/logout" >Logout</Link>
         </React.Fragment>);
         else return(<Redirect to="/"/>)
    }
}
export default User;