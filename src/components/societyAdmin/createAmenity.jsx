import React, { Component } from 'react';
import {Modal ,Alert, Spinner} from 'react-bootstrap';

class CreateAmenity extends Component {
    constructor(props) {
        super(props);
        this.state = {
          name:"",
          description:"",
          show : false,
      message:"",
      variant:""
        };
        this.newAmenity = this.newAmenity.bind(this)
      }

      handleClose = () =>{
        
        this.setState({show:false});
        console.log("close called");
        
    }

    newAmenity = () => {
        console.log(this.state.name);
        let newAmenity = {"name": this.state.name, 
        "content":this.state.description,
        "apartmentId":localStorage.getItem("apartmentId")};
        console.log(newAmenity);
        fetch(`https://cors-anywhere.herokuapp.com/http://ec2-3-20-203-149.us-east-2.compute.amazonaws.com/apartment/create/amenity`,{
        method:"POST",
        headers:{
          
          "Content-Type":"application/json",
        },
        body:JSON.stringify(newAmenity)
      }).then((result)=>{
        result.text().then((resp)=>{
            console.log(resp);
            if(resp === "Apartment added successfully"){
                this.setState({message : resp});
              this.setState({variant:"success"});
              this.setState({show:true});
            }
            else{
                this.setState({message : resp});
              this.setState({variant:"danger"});
              this.setState({show:true});
            }
        })
    })

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
           
        <div className="header">create Amenity</div>
        
        <div className="content">
            <div></div>
        <div className="form">
            <div className="form-group">
              <label >New Amenity Name</label>
              <input type="text" name="name" placeholder="Amenity name"
              onChange={(e) => {this.setState({name:e.target.value})} }/>
            </div>

            <div className="form-group">
              <label >Description</label>
              <input type="text" name="description" placeholder="Description"
              onChange={(e) => {this.setState({description :e.target.value})} }/>
            </div>
            
          </div>
          

          </div>
        <div className="footer">
          <button type="button " className="btn btn-primary" onClick={()=> this.newAmenity()}>
            Create
          </button>
        </div>
        
        </div>
        
        </React.Fragment> );
    }
}
 
export default CreateAmenity;