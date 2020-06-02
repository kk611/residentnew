import React, { Component } from 'react';
class CreateAmenity extends Component {
    constructor(props) {
        super(props);
        this.state = {
          name:"",
          description:"",
        };
        this.newAmenity = this.newAmenity.bind(this)
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
      })

      //("#myAlert").alert('close');
      
    }

    render() { 
      //const message = (`#{message}`);
      //message.hide();
        return ( <React.Fragment>
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