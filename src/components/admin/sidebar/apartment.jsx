import React, { Component } from 'react';
import Counter from "./counter";
import '../../../css/counter.scss';
import PopupForm from './editApartment';
import {Button,Spinner} from 'react-bootstrap';
import Select from 'react-select';
import {Tabs, Tab } from 'react-bootstrap';
import Amenities from '../apartment/amenities/amenities';
import Notices from '../apartment/notices/notices';
import Residents from '../apartment/residents/residents';
import Bookings from '../apartment/bookings/bookings';
import Forums from '../apartment/forums/forums';
import Polls from '../apartment/polls/polls';
import Visitors from '../apartment/visitors/visitors';
import GatePass from '../apartment/gatepass/gatepass';
class Apartment extends Component {
    state = { 
        apartments:[],societyAdmin:[], selectedApartment:{},spin:false,toggle:false,show:false, placeholder:"Select apartment"
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
       this.setState({spin:true});
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
            this.setState({toggle:true});
            this.setState({spin:false});
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
    handleChange = (selectedApartment) =>{
      this.setState({selectedApartment});
      this.setState({show:true});
      this.getSocietyAdmin();
    }

    getSocietyAdmin = () =>{this.setState({toggle:true});
    fetch(`https://cors-anywhere.herokuapp.com/http://ec2-3-20-203-149.us-east-2.compute.amazonaws.com/user/list`,{
       method:"POST",
       headers:{
         "Content-Type":"application/json"
       }
       //body:JSON.stringify(this.state)
     }).then((result)=>{
       result.json().then((resp)=>{
           
           //JSON.parse(resp);
           let data = resp;
           
           
           console.log(data);
           let newdata = data.map(x => ({id:x._id,username:x.username, email:x.email,password:x.password,apartmentId:x.apartment,staff:x.staff,role:x.role,createdAt:x.createdAt}));
           console.log(this.state.selectedApartment);
            const apartmentId = this.state.selectedApartment.id;
            console.log(newdata);
            let societyAdmin = newdata.filter(resident => resident.apartmentId === apartmentId&& resident.role === "admin");
            console.log(societyAdmin);
            
            //const societyAdmin =  resident.id;
           console.log("1",societyAdmin);
           this.setState({societyAdmin:societyAdmin});
           
           
       })
     });
}

    style={
      height:'10px',
      float:'right'
  };

    render() { 
        return ( <React.Fragment><div><button className="btn btn-primary" 
        onClick ={()=>{this.getList()}}>
          {
      this.state.spin &&
      <Spinner
      as="span"
      animation="border"
      size="sm"
      role="status"
      aria-hidden="true"
    />
   }Apartments</button></div>
        {/* <div>{this.state.apartments.map(apartment =>
        (<Counter  key={apartment.id} 
          onDeleteAmenity={this.onDeleteAmenity}
          onUpdateAmenity={this.onUpdateAmenity}
          onSubmitAmenity={this.onSubmitAmenity}
          onSubmit = {this.onSubmit}
          onDelete={this.handleDelete}
           apartment={apartment}>
             
             </Counter>))}</div> */}
        {this.state.toggle&&
        <Select options = {this.state.apartments} placeholder ={this.state.placeholder}
        className = "basic-single" getOptionLabel = {(option) => option.name }
         getOptionValue = {(option)=>option.name}
         value ={this.state.selectedApartment} onChange={this.handleChange}
        />}
        
{this.state.show&&
<Tabs  defaultActiveKey="amenities" className="mb-3">
                            {/* <Tab eventKey="amenities" title="Amenities">
                                <Amenities apartment = {this.state.selectedApartment}/>
                            </Tab> */}
                            <Tab eventKey="residents" title="Residents">
                                <Residents apartment ={this.state.selectedApartment}/>
                            </Tab>
                            {/* <Tab eventKey="notices" title="Notices">
                            <Notices apartment ={this.state.selectedApartment} societyAdmin={this.state.societyAdmin}/>                            </Tab>
                            <Tab eventKey="bookings" title="Bookings">
                              <Bookings apartment ={this.state.selectedApartment}/>
                            </Tab>
                            <Tab eventKey="forums" title="Forums">
                              <Forums/>
                            </Tab>
                            <Tab eventKey="polls" title="Polls">
                              <Polls apartment = {this.state.selectedApartment}/>
                            </Tab>
                            <Tab eventKey="gatepass" title="Gatepass">
                              <GatePass apartment = {this.state.selectedApartment}/>
                            </Tab>
                            <Tab eventKey="visitors" title="Visitors">
                              <Visitors apartment = {this.state.selectedApartment}/>
                            </Tab> */}
                        </Tabs>
    }

             </React.Fragment> );
    }
}

export default Apartment;