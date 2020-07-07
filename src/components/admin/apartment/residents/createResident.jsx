import React, { Component } from 'react';
import {Alert, Modal} from "react-bootstrap";
import ReactSearchBox from "react-search-box";
class CreateUser extends Component {
    constructor(props){
        super(props);
        this.state = { 
            resident:true,
            admin:false,role:"resident",
            variant:"",show:false,message:"", };
        
    };

    handleInputChange = (event) => {
      const target = event.target;
      const value = target.checked;
      const name = target.name;
      
      const role = value === true ^ name === "admin" ?"resident":"admin";
      const otherName = name ==="admin"? "resident":"admin";

      this.setState({
        [name]: value,
        [otherName]:!value,
        role:role
      });
      console.log(this.state.resident, this.state.admin, value);
    }
    
    handleClose = () =>{
        
        this.setState({show:false});
        console.log("close called");
        
    }

    //data=[{"key":1,"value":"resident"},{"key":2,"value":"admin"}];
    

    newUser = () => {
        //e.preventDefault();
        console.log(this.state);
        const query={"username":this.state.username, "email":this.state.email, 
        "password":this.state.password, 
        "role":this.state.role, 
        "apartmentId":this.props.apartment.id
    
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
            this.setState({message:"New User created"});
            this.setState({variant:"success"});
            console.log("1");
            }
            else{
                console.log(resp.message);
            this.setState({message:resp.message});
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
              
              <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
        
        </Modal.Header>
        <Modal.Body>
        <div className="base-container">
        <div className="header">
        <div className="content">
        <div>
        <Alert id="alertMsg"  show = {this.state.show} variant={this.state.variant}>{this.state.message}</Alert>
        </div>
          </div>
</div></div>
             </Modal.Body>
        
                
            </Modal>
             <div className="base-container" >
             
          <div className="header">Create User</div>
          {/* <Alert id="alertMsg"  show = {this.state.show} variant={this.state.variant}>{this.state.msg}</Alert> */}
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
              {/* <div className="form-group">
                <label >Role</label>
                <ReactSearchBox placeholder="role" data={this.data}  onSelect={(record) =>{
                  this.setState({role:record.value})
              }}></ReactSearchBox>
              </div> */}
              <div style = {{fontSize:"20px",alignSelf:"normal"}}>
                Role
                </div>
              <div  style={{display:"flex"}}>
                
                <input style={{marginTop:"5px"}} name="resident" type="checkbox" checked={this.state.resident} onChange={this.handleInputChange} />
                <label style={{marginRight:"20px"}}> Resident </label>
                
                <input style={{marginTop:"5px"}}  name="admin" type="checkbox" checked={this.state.admin} onChange={this.handleInputChange} />
                <label style={{marginRight:"20px"}}>Society Admin </label>
              </div>
              
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