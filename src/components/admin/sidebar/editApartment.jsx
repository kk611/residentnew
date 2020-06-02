import React, { Component } from 'react';
import {Modal, Button,Form } from 'react-bootstrap';
import '../../../App.scss';
class PopupForm extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            show: false,
            name:"",
            prevName:this.props.apartment.name
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

        this.props.onSubmit(this.state.name, this.props.apartment.id, this.state.prevName);
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
            <label>Enter new apartment name</label><br></br>
            <input type="text" name="name" placeholder="New Apartment name"
              onChange={(e) => {this.setState({name:e.target.value})} }/>
            </form>
            </div>
            <Button variant="primary" onClick={() =>{this.handleSubmit()}}>
            Submit
          </Button>
            </div>
            
            <div className="form">
            <div className="form-group">
            <form>
            <label>Enter new amenity name</label><br></br>
            <input type="text" name="name" placeholder="New amenity name"
              onChange={(e) => {this.setState({amenityName:e.target.value})} }/>
            </form>
            <form>
            <label>Enter amenity description</label><br></br>
            <input type="text" name="description" placeholder="Description"
              onChange={(e) => {this.setState({amenityDescription:e.target.value})} }/>
            </form>
            </div>
            <Button variant="primary" onClick={() =>{this.props.onSubmitAmenity(this.props.apartment.id, this.state.amenityName,this.state.amenityDescription)}}>
            Submit
          </Button>
            </div>


          </div>
</div></div>
             </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
          
        </Modal.Footer>
      </Modal>
            </React.Fragment> );
    }
}
 
export default PopupForm;