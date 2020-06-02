import React, { Component } from 'react';
import Select from "react-dropdown-select";
import {Modal, Button,Form } from 'react-bootstrap';
import '../../../App.scss';
class EditAmenity extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            searchable:true,
            show: false,
            apartmentId:this.props.apartment.id,
            amenities : this.populateAmenities()
         };
         this.setShow = this.setShow.bind(this)
         this.handleClose = this.handleClose.bind(this)
         this.handleShow = this.handleShow.bind(this)
    }



    populateAmenities = () =>{
        const data = this.props.apartment.amenities;
        let newdata = data.map(x => ({"key":x._id,"value":x.name,"desciption":x.content}));

        console.log("1",newdata);
        // let { "key":_id, "value":name,apartmentId,content } = this.props.apartment.amenities;
        // const arr = { "key":_id, "value":name,apartmentId,content };
        // console.log(arr);
        return newdata;
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


    render() { 

        return (
            <React.Fragment>
            <Button size="sm"className={this.style}  variant="primary" onClick={this.handleShow}>
        Edit Amenities
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
            
            <Select options={this.state.amenities} onChange ={(values) =>{
                console.log(values); 
                this.setState({updateAmenityId: values[0].key}) 
            }}  labelField = "value" ></Select>

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
            <Button variant="primary" onClick={() =>{this.props.onUpdateAmenity(this.state.updateAmenityId, this.state.amenityName,this.state.amenityDescription)}}>
            Submit
          </Button>
            </div>


            <div className="form">
            <div className="form-group">
            
            <Select options={this.state.amenities} onChange ={(values) =>{
                console.log(values); 
                this.setState({deleteAmenityId: values[0].key}) 
            }}  labelField = "value" ></Select>

            </div>
            <Button variant="danger" onClick={() =>{this.props.onDeleteAmenity(this.state.deleteAmenityId, this.state.apartmentId)}}>
            Delete
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
 
export default EditAmenity;