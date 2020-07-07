import React, { Component } from 'react';

import {Modal ,Alert, Spinner} from 'react-bootstrap';
class CreateApartment extends Component {
    constructor(props) {
        super(props);
        this.state = {
          username : "", name: "", password:"", email:"",
          show : false,showNew:false,
      message:"",
      variant:"",role:"admin"
        };
        this.newApartment = this.newApartment.bind(this)
      }
    

    newApartment = () => {
      console.log(this.state.username);
      if(this.state.username === "" && this.state.password === "" && this.state.email === "" ||
      this.state.username !== "" && this.state.password !== "" && this.state.email !== "" 
      ){
        if(this.state.name === ""){
          this.setState({message : "Apartment name cannot be empty!"});
            this.setState({variant:"danger"});
            this.setState({show:true});
        }
        else{
        console.log(this.state.name);
        const data = {"name":this.state.name};
        fetch(`https://cors-anywhere.herokuapp.com/http://ec2-3-20-203-149.us-east-2.compute.amazonaws.com/apartment/create`,{
        method:"POST",
        headers:{
          
          "Content-Type":"application/json",
        },
        body:JSON.stringify(data)
      }).then((result)=>{
        result.json().then((resp)=>{
          if(resp.message === 'Apartment Created successfully'){
            this.setState({apartmentId:resp.apartments._id });
            if(this.state.username !== "" && this.state.password !== "" && this.state.email !== "" ){
              this.setState({message : resp.message});
              this.setState({variant:"success"});
              this.newUser();
            }
            else{
            this.setState({message : resp.message});
            this.setState({variant:"success"});
            this.setState({show:true});
            }
          }
          else{this.setState({message : resp.message});
          this.setState({variant:"danger"});
          this.setState({show:true});

          }
        })
      })
    }
    }
    else{
      this.setState({message : "Username, email and password cannot be empty!"});
            this.setState({variant:"danger"});
            this.setState({show:true});
    }
     
      
    }


    handleClose = () =>{
        
      this.setState({show:false});
      this.setState({showNew:false});
      console.log("close called");
      
  }


  newUser = () => {
    //e.preventDefault();
    console.log(this.state);
    const query={"username":this.state.username, "email":this.state.email, 
    "password":this.state.password, 
    "role":this.state.role, 
    "apartmentId":this.state.apartmentId

};


console.log(query);

    fetch(`https://cors-anywhere.herokuapp.com/http://ec2-3-20-203-149.us-east-2.compute.amazonaws.com/user/register`,
    {
    method:"POST",
    headers:{
      
      "Content-Type":"application/json"
    },
    body:JSON.stringify(query)
  }).then((result)=>{
    result.json().then((resp)=>{
        if(resp.isSuccessful === true ){
        this.setState({msgNew:"Society admin created"});
        this.setState({variantNew:"success"});
        console.log("1");
        }
        else{
            console.log(resp.message);
        this.setState({msgNew:resp.message});
        this.setState({variantNew:"danger"});
        }
        this.setState({show:true});
        this.setState({showNew:true});
    }
  )
  });

  //("#myAlert").alert('close');
  
}

    render() { 
      //const message = (`#{message}`);
      //message.hide();
        return ( <React.Fragment>
 <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
          
        </Modal.Header>
        <Modal.Body>
        <div className="base-container">
        <div className="header">
        <div className="content">
        <div>
        <Alert id="alertMsg"  show = {this.state.show} variant={this.state.variant}>{this.state.message}</Alert><br/>
        <Alert id="alertMsg1"  show = {this.state.showNew} variant={this.state.variantNew}>{this.state.msgNew}</Alert>
        </div>
          </div>
</div></div>
             </Modal.Body>
        
                
            </Modal>

           <div className="base-container" >
           
        <div className="header">Create apartment</div>
        
        <div className="content">
            
        <div className="form">
            <div className="form-group">
              <label >New Apartment Name</label>
              <input type="text" name="name" placeholder="Apartment name"
              onChange={(e) => {this.setState({name:e.target.value})} }/>
            </div>
            
          </div></div>
          
           
           <div className="header">Create Society Admin(optional)</div>
           <div className="content">
          <div className="form">
          <div className="form-group">
                <label >Username</label>
                <input type="text" name="name" placeholder="Username"
                onChange={(e) => {this.setState({username: e.target.value})} }/>
              </div>
              <div className="form-group">
                <label >Email</label>
                <input type="text" name="email" placeholder="Email" 
                onChange={(e) => {this.setState({email:e.target.value})} }/>
              </div>
              <div className="form-group">
                <label >Password</label>
                <input type="text" name="password" placeholder="Password" 
                onChange={(e) => {this.setState({password:e.target.value})} }/>
              </div>
              </div>
          </div>
          
          
        <div className="footer">
          <button type="button " className="btn btn-primary" onClick={()=> this.newApartment()}>
            Create
          </button>
        </div>
        
        </div>
        
        </React.Fragment> );
    }
}
 
export default CreateApartment;

/*
class CreateApartment extends Component {
    constructor(props) {
    super(props);
    this.state = { apname:"" }
        this.onChange = this.onChange.bind(this)
        this.newApartment=this.newApartment(this)
}
    ;

    newApartment = () => {
        console.log(e.target.value.name);
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    

    render() { 
        return ( <React.Fragment><div>create apartment</div>
        <div className="form">
            <div className="form-group">
              <label htmlFor="name">name</label>
              <input type="text" name="name" placeholder="name" value={this.state.name}
              onChange={this.onChange }/>
            </div>
            
          </div>
        
        <div className="footer">
          <button type="button" className="btn" onClick={()=> this.newApartment()}>
            Login
          </button>
        </div>
        </React.Fragment> );
    }
}
 */