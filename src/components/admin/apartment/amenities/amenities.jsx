import React, { Component } from 'react';
import CounterAmenities from "./counterAmenities";
import {Modal ,Alert, Spinner} from 'react-bootstrap';
class Amenities extends Component {
    constructor(props) {
        super(props);
        this.state = { 
        amenities:[],toggle:false,
        show : false,
        message:"",
        variant:""
     };
    }
     handleClose = () =>{
        
      this.setState({show:false});
      console.log("close called");
      
  }
    getList = () =>{
      this.setState({toggle:true})
                console.log(this.props.apartment);
               //JSON.parse(resp);
               let data = this.props.apartment.amenities;
               
               
               console.log(data);
               let newdata = data.map(x => ({id:x._id,name:x.name}));
   
               
               this.setState({amenities:newdata});
               this.setState({toggle:false})
           
         }

         handleDelete = (counterId) =>{
           
            console.log("handler called",counterId );
            const amenities = this.state.amenities.filter(c => c.id !== counterId);
            console.log(amenities);
            fetch(`https://cors-anywhere.herokuapp.com/http://ec2-3-20-203-149.us-east-2.compute.amazonaws.com/apartment/delete/amenity`,{
             method:"DELETE",
             headers:{
                
               "amenityid":counterId,
               "apartmentid":this.props.apartment.id,
               "Content-Type":"application/json",
             }
             //body:JSON.stringify(this.state)
           }).then((result)=>{
            result.text().then((resp)=>{
                console.log(resp);
                if(resp === "Deleted successfully!"){
                    this.setState({message : resp});
                  this.setState({variant:"success"});
                  this.setState({show:true});
                  this.setState({amenities:amenities});
                }
                else{
                    this.setState({message : resp});
                  this.setState({variant:"danger"});
                  this.setState({show:true});
                }
            })
        })
            
          }

          onSubmit = (val, id,content) => {
            //this.props.apartment.name = val;
            //this.setState({name:val});
    
            const amenities = [...this.state.amenities];
            
    
            const index = amenities.findIndex(i =>i.id === id);
            amenities[index] = {id};
            amenities[index].name = val;
            amenities[index].content =  content;
            //console.log("aps",this.state.apartments[index]);
            this.setState({amenities});
            const query = {"name":val,"content":content};
            console.log(query);
            fetch(`https://cors-anywhere.herokuapp.com/http://ec2-3-20-203-149.us-east-2.compute.amazonaws.com/apartment/update/amenity`,{
            method:"PUT",
            headers:{
              "amenityid":id,
              "Content-Type":"application/json",
            },
            body:JSON.stringify(query)
            //body:JSON.stringify(this.state)
          })
        }
     

    render() { 
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
          <div><button className="btn btn-primary" 
        onClick ={()=>{this.getList()}}>
          {
      this.state.toggle &&
      <Spinner
      as="span"
      animation="border"
      size="sm"
      role="status"
      aria-hidden="true"
    />
   }Amenities</button></div>
        <div>{this.state.amenities.map(amenity =>
        (<CounterAmenities  key={amenity.id}
            onSubmit = {this.onSubmit} 
            onDelete={this.handleDelete}
           amenity={amenity}>
             
             </CounterAmenities>))}</div>
             </React.Fragment> );
    }
}
 
export default Amenities;