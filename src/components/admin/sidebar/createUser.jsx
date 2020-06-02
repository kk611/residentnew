import React, { Component } from 'react';
import {Alert} from "react-bootstrap";
import ReactSearchBox from "react-search-box";
class CreateUser extends Component {
    constructor(props){
        super(props);
        this.state = { 
            variant:"",show:false,msg:"" };
        this.apartmentList();
    };


    data=[{"key":1,"value":"resident"},{"key":2,"value":"admin"}];
    apartmentList = () =>{
        fetch(`https://cors-anywhere.herokuapp.com/http://ec2-3-20-203-149.us-east-2.compute.amazonaws.com/apartment/list`,{
        method:"POST",
        headers:{
          
          "Content-Type":"application/json",
        }
        //body:JSON.stringify(this.state)
      }).then((result)=>{
        result.json().then((resp)=>{
            let data = resp.apartments;
            
            let newdata = data.map(x => ({"key":x._id,"value":x.name}));
            this.setState({apartments:newdata});
            console.log(newdata);
            
        })
      })

        
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
            this.setState({msg:"New User created"});
            this.setState({variant:"success"});
            console.log("1");
            }
            else{
                console.log(resp.message);
            this.setState({msg:resp.message});
            this.setState({variant:"danger"});
            }
            this.setState({show:true});
        }
      )
      });

      //("#myAlert").alert('close');
      
    }

    render() { 
        //const message = (`#{message}`);
        //message.hide();
          return ( <React.Fragment>
             <div className="base-container" >
             
          <div className="header">Create User</div>
          <Alert id="alertMsg"  show = {this.state.show} variant={this.state.variant}>{this.state.msg}</Alert>
          <div className="content">
              <div></div>
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
              {/* <div className="form-group">
                <label >Role</label>
                <input type="text" name="role" placeholder="Role"
                onChange={(e) => {this.setState({role:e.target.value})} }/>
              </div> */}
              {/* <div className="form-group">
                <label >Apartment Name</label>
                <input type="text" name="apartmentId" placeholder="Apartment name" 
                onChange={(e) => {this.setState({apartmentId:e.target.value})} }/>
              </div> */}
              <div className="form-group">
                <label >Role</label>
                <ReactSearchBox placeholder="role" data={this.data}  onSelect={(record) =>{
                  this.setState({role:record.value})
              }}></ReactSearchBox>
              </div>

              <div className="form-group">
              <label >Apartment Name</label>
              <ReactSearchBox placeholder="apartment name" data={this.state.apartments}  onSelect={(record) =>{
                  this.setState({apartmentId:record.key})
              }}></ReactSearchBox></div>
              
            </div>

            
  
            </div>
          <div className="footer">
            <button type="button " className="btn btn-primary" onClick={()=> this.newUser()}>
              Create
            </button>
          </div>
          
          </div>
          
          </React.Fragment> );
      }
}
export default CreateUser;