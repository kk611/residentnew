import React, { Component } from 'react';
import {Modal, Button,Form } from 'react-bootstrap';
import '../../../../../src/App.scss';

class PopupForm extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            show: false,
            name:this.props.amenity.name,
            //prevName:this.props.amenity.name,
            content:this.props.amenity.content
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
        console.log(this.state.name);
        this.handleClose(false);

        this.props.onSubmit(this.state.name, this.props.amenity.id,  this.state.content);
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
            <label>Update amenity name</label><br></br>
            <input type="text" name="name" placeholder="New Amenity name"
              onChange={(e) => {this.setState({name:e.target.value})} }/>

<label>Update description</label><br></br>
            <input type="text" name="content" placeholder="description"
              onChange={(e) => {this.setState({content:e.target.value})} }/>
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