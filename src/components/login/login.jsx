import React from "react";
import loginImg from "../../login.svg";
import Auth from "./auth";
import { BrowserRouter , Route, Switch, Link , Redirect} from "react-router-dom";
import User from "../user/user";
import auth from "./auth";
export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username:"",
      password:"",
      loggedin : false,
      //role:""
    };
  }

  login = () => {
    
    console.log("state", this.state);
    fetch(`https://cors-anywhere.herokuapp.com/http://ec2-3-20-203-149.us-east-2.compute.amazonaws.com/user/login`,{
      method:"POST",
      headers:{
        
        "Content-Type":"application/json",
      },
      body:JSON.stringify(this.state)
    }).then((result)=>{
      result.json().then((resp)=>{
        console.log(resp.auth_token);
        localStorage.setItem("login", JSON.stringify(resp.auth_token));
        localStorage.setItem("role", JSON.stringify(resp.user.role));
        //localStorage.setItem("userId"), JSON.stringify(resp.user._id);

        if(resp.user.role !== "superadmin" ){
          console.log("1");
          localStorage.setItem("apartmentId", resp.user.apartment._id);
        }
        console.log(Auth);
        if(resp.user.role === "superadmin" )
        Auth.login(resp.auth_token, resp.user.role, resp.user._id, "");
        else
        Auth.login(resp.auth_token, resp.user.role, resp.user._id, resp.user.apartment._id);
        //this.setState({loggedin:true, role:JSON.Parse.resp.user.role});
        this.setState({loggedin:true});
      })
    })

    
    
  }

  render() {
    if(localStorage.getItem("role") === "\"superadmin\"") 
    return <div><Redirect to = "/admin"/></div>
    // else if (localStorage.getItem("role") === "\"resident\"") 
    // return <div><Redirect to = "/user"/></div>
    else if (localStorage.getItem("role") === "\"admin\"") 
    return <div><Redirect to = "/Societyadmin"/></div>
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Login</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} />
          </div>
          <div className="form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" name="username" placeholder="username"
              onChange={(e) => {this.setState({username:e.target.value})} }/>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" placeholder="password" 
              onChange={(e) => {this.setState({password:e.target.value})} }/>
            </div>
          </div>
        </div>
        <div className="footer">
          <button type="button" className="btn" onClick={()=> this.login()}>
            Login
          </button>
        </div>
      </div>
    );
  }
}
