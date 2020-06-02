import React, { Component } from 'react';
import {Modal, Button,Form } from 'react-bootstrap';
import '../../../App.scss';
import Apartment from './apartment';
class PopupForm extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            show: false,
            username:this.props.user.username,
            email:this.props.user.email,
            password:this.props.user.password,
            role:this.props.user.role,
            apartmentId :this.props.user.apartmentId
         }
         this.setShow = this.setShow.bind(this)
         this.handleClose = this.handleClose.bind(this)
         this.handleShow = this.handleShow.bind(this)
    }


    setShow = (val) => {
        
        this.setState({show : val});
        console.log("setshow called");
    }

    handleClose = () =>{
        
        this.setShow(false);
        console.log("close called");
        
    }

    handleShow = () =>{
        
        this.setShow(true);
        console.log("show called");
    }

    handleSubmit = () =>{
        //e.preventDefault(e);

        //this.props.apartment.name = this.state.name;
        console.log(this.state);
        this.handleClose(false);
        let {username, email, password, role,apartmentId} = this.state;
        const updatedInfo = {username, email, password, role,apartmentId};
        this.props.onSubmit( this.props.user.id, updatedInfo);
    }
    style={
        height:'10px'

    };

    render() { 

        return (
            <React.Fragment>
            <Button size="sm"className={this.style}  variant="primary" onClick={this.handleShow}>
        Edit
      </Button>

            <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="base-container">
        <div className="header">
        <div className="content">
        <div className="form">
            <div className="form-group">
            <form>
            <label>Update Username</label><br></br>
            <input type="text" name="username" placeholder="New Apartment name" value={this.state.username}
              onChange={(e) => {this.setState({username:e.target.value})} }/>
            </form>
            </div>
            <div className="form-group">
            <form>
            <label>Update Email</label><br></br>
            <input type="text" name="email" placeholder="New email" value={this.state.email}
              onChange={(e) => {this.setState({email:e.target.value})} }/>
            </form>
            </div>
            <div className="form-group">
            <form>
            <label>Update Password</label><br></br>
            <input type="text" name="password" placeholder="New Password"  value={this.state.password}
              onChange={(e) => {this.setState({password:e.target.value})} }/>
            </form>
            </div>
            <div className="form-group">
            <form>
            <label>Update role</label><br></br>
            <input type="text" name="role" placeholder="New Role" value={this.state.role}
              onChange={(e) => {this.setState({role:e.target.value})} }/>
            </form>
            </div>
            </div>
          </div>
</div></div>
             </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() =>{this.handleSubmit()}}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
            </React.Fragment> );
    }
}
 
export default PopupForm;