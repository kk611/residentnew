import React, { Component } from 'react';
import Counter from "./counter";
import '../../../css/counter.scss';
import PopupForm from './editApartment';
import {Button} from 'react-bootstrap';
class Apartment extends Component {
    state = { 
        apartments:[]
     }

     handleDelete = (counterId) =>{
       console.log("handler called",counterId );
       const apartments = this.state.apartments.filter(c => c.id !== counterId);
       fetch(`https://cors-anywhere.herokuapp.com/http://ec2-3-20-203-149.us-east-2.compute.amazonaws.com/apartment/delete`,{
        method:"DELETE",
        headers:{
          "apartmentid":counterId,
          
          "Content-Type":"application/json",
        }
        //body:JSON.stringify(this.state)
      })
       this.setState({apartments:apartments})
     }

     getList = () =>{
     fetch(`https://cors-anywhere.herokuapp.com/http://ec2-3-20-203-149.us-east-2.compute.amazonaws.com/apartment/list`,{
        method:"POST",
        headers:{
          
          "Content-Type":"application/json",
        }
        //body:JSON.stringify(this.state)
      }).then((result)=>{
        result.json().then((resp)=>{
            
            //JSON.parse(resp);
            let data = resp.apartments;
            //const { _id , name }= data;
            //this.setState({apartments:data});
            
            console.log(data);
            let newdata = data.map(x => ({id:x._id,name:x.name, amenities:x.amenities}));

            
            this.setState({apartments:newdata});
            
            //let data = JSON.parse(resp[0]); console.log(data.name);
          //console.log(resp.auth_token);
          //localStorage.setItem("login", JSON.stringify(resp.auth_token));
          //localStorage.setItem("role", JSON.stringify(resp.user.role));
          //this.setState({loggedin:true, role:JSON.Parse.resp.user.role});
          //this.setState({loggedin:true});
        })
      })}

      onSubmitAmenity = (apartmentId, name, description) =>{

        let query = {"name":name,"content":description, "apartmentId":apartmentId};
        
        fetch(`https://cors-anywhere.herokuapp.com/http://ec2-3-20-203-149.us-east-2.compute.amazonaws.com/apartment/create/amenity`,{
        method:"POST",
        headers:{
          //"apartmentid":id,
          "Content-Type":"application/json",
        },
        body:JSON.stringify(query)
        //body:JSON.stringify(this.state)
      })


      }

      onSubmit = (val, id,name) => {
        //this.props.apartment.name = val;
        //this.setState({name:val});

        const apartments = [...this.state.apartments];
        

        const index = apartments.findIndex(i =>i.id === id);
        apartments[index] = {id};
        apartments[index].name = val;
        //console.log("aps",this.state.apartments[index]);
        this.setState({apartments});
        const query = {"name":val};
        fetch(`https://cors-anywhere.herokuapp.com/http://ec2-3-20-203-149.us-east-2.compute.amazonaws.com/apartment/update`,{
        method:"PUT",
        headers:{
          "apartmentid":id,
          "Content-Type":"application/json",
        },
        body:JSON.stringify(query)
        //body:JSON.stringify(this.state)
      })
    }

    onUpdateAmenity = (amenityId, amenityName , amenityDescription) =>{
      console.log("1");
      console.log(amenityId, amenityName, amenityDescription);
      
      let query = {"name":amenityName,"content":amenityDescription};
      fetch(`https://cors-anywhere.herokuapp.com/http://ec2-3-20-203-149.us-east-2.compute.amazonaws.com/apartment/update/amenity`,{
      method:"PUT",
      headers:{
        //"apartmentid":id,
        "amenityId":amenityId,
        "Content-Type":"application/json"
      },
      body:JSON.stringify(query)
      //body:JSON.stringify(this.state)
    })
    }

    onDeleteAmenity = ( deleteAmenityId,apartmentId) => {
      console.log(apartmentId, deleteAmenityId);
      fetch(`https://cors-anywhere.herokuapp.com/http://ec2-3-20-203-149.us-east-2.compute.amazonaws.com/apartment/delete/amenity`,{
      method:"DELETE",
      headers:{
        //"apartmentid":id,
        "amenityid":deleteAmenityId,
        "apartmentid":apartmentId,
        "Content-Type":"application/json"
      }
      //body:JSON.stringify(query)
      //body:JSON.stringify(this.state)
    })

    }

    style={
      height:'10px',
      float:'right'
  };

    render() { 
        return ( <React.Fragment><div><button className="btn btn-primary" 
        onClick ={()=>{this.getList()}}>Apartments</button></div>
        <div>{this.state.apartments.map(apartment =>
        (<Counter  key={apartment.id} 
          onDeleteAmenity={this.onDeleteAmenity}
          onUpdateAmenity={this.onUpdateAmenity}
          onSubmitAmenity={this.onSubmitAmenity}
          onSubmit = {this.onSubmit}
          onDelete={this.handleDelete}
           apartment={apartment}>
             
             </Counter>))}</div>
             </React.Fragment> );
    }
}

export default Apartment;