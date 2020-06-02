import React, { Component } from 'react';

class Auth {
  constructor() {
    this.authenticated = false;
    this.authToken = "";
    this.role = "";
    this.userId = "";
    this.apartmentId = "";
    //this.role=""
  }
  login = (token, role, userId, apartmentId) => {
    this.authenticated = true;
    this.authToken = token;
    this.role = role;
    this.userId = userId;
    this.apartmentId = apartmentId;

    //this.role="";
    // cb = () => {
    
    // };
  }
  logout = () => {
    //this.authenticated = false;
    this.authenticated = false;
    this.authToken = "";
    this.role = "";
    this.userId = "";
    this.apartmentId = "";
  }

  isauthenticated(){
    return this.authenticated;
  }
  
}
 
export default new Auth();
  