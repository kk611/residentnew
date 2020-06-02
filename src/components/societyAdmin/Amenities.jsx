import React, { Component } from 'react';
import CounterAmenities from "./counterAmenities";
class Amenities extends Component {
    state = { 
        amenities:[]
     }

    getList = () =>{
        fetch(`https://cors-anywhere.herokuapp.com/http://ec2-3-20-203-149.us-east-2.compute.amazonaws.com/apartment/details`,{
           method:"POST",
           headers:{
             "apartmentId":localStorage.getItem("apartmentId"),
             "Content-Type":"application/json"
           }
           //body:JSON.stringify(this.state)
         }).then((result)=>{
           result.json().then((resp)=>{
               
               //JSON.parse(resp);
               let data = resp.amenities;
               
               
               console.log(data);
               let newdata = data.map(x => ({id:x._id,name:x.name}));
   
               
               this.setState({amenities:newdata});

           })
         })}

         handleDelete = (counterId) =>{
            console.log("handler called",counterId );
            const amenities = this.state.amenities.filter(c => c.id !== counterId);
            console.log(amenities);
            fetch(`https://cors-anywhere.herokuapp.com/http://ec2-3-20-203-149.us-east-2.compute.amazonaws.com/apartment/delete/amenity`,{
             method:"DELETE",
             headers:{
                
               "amenityid":counterId,
               "apartmentid":localStorage.getItem("apartmetnId"),
               "Content-Type":"application/json",
             }
             //body:JSON.stringify(this.state)
           })
            this.setState({amenities:amenities})
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
        return ( <React.Fragment><div><button className="btn btn-primary" 
        onClick ={()=>{this.getList()}}>Amenities</button></div>
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