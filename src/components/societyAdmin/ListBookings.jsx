import React, { Component } from 'react';
import CounterBooking from "./counterBooking";
import {Modal ,Alert, Spinner} from 'react-bootstrap';
class ListBookings extends Component {
    constructor(props) {
        super(props);
        this.state = { residents:[],bookings:[],toggle:false ,show : false,
            message:"",
            variant:"" }
    }

    handleClose = () =>{
        
        this.setState({show:false});
        console.log("close called");
        
    }

    getBookings = () =>{

        const apartmentId = localStorage.getItem("apartmentId");
        console.log(apartmentId);
        
        for(let  index =0 ; index< this.state.residents.length;index++){
            const ownerId = this.state.residents[index].id;
            console.log(ownerId);
            const ownerName = this.state.residents[index].username;

            //let query ={"apartmentid":apartmentId, "ownerid":ownerId};
            fetch(`https://cors-anywhere.herokuapp.com/http://ec2-3-20-203-149.us-east-2.compute.amazonaws.com/booking/list`,{
               method:"POST",
               headers:{
                   "Content-Type":"application/json",
                   "apartmentid":apartmentId,
                    "userid":ownerId
                 },
               //body:JSON.stringify(query)
            }).then((result)=> {
                result.json().then((resp)=>{

                   let data = resp.bookings;
                   let newData = data.map(x => ({bookingId:x._id, 
                       amenityId:x.amenity._id,
                       amenityName:x.amenity.name ,
                       amenityContent:x.amenity.content,
                       bookingDate:x.start.slice(0,10),
                       start:x.start.slice(11,23),
                       end:x.end.slice(11,23),
                       apartmentId:apartmentId,
                       ownerId:ownerId ,
                       ownerName:ownerName
                    }));
                   console.log(newData);
                   let newBookings = this.state.bookings;
                   for(let index=0;index<newData.length;index++){
                    newBookings.push(newData[index]);
                   }
                   //newGatePass.sort((a, b) => a.createdDate.localeCompare(b.createdDate));
                   console.log(newBookings);
                   this.setState({bookings:newBookings});
                   this.setState({toggle:false});
                })
            })
        }
    }

    getList = () =>{
        this.setState({toggle:true});
        this.setState({bookings:[]});
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
            let newdata = data.map(x => ({id:x._id,username:x.username, email:x.email,apartmentId:x.apartment}));
            const apartmentId = localStorage.getItem("apartmentId");
            console.log(apartmentId);
            let residents = newdata.filter(resident => resident.apartmentId === apartmentId)
            console.log("1",residents);
            this.setState({residents:residents});
            this.getBookings();
           })
         })

    }

    handleDelete = (bookingId) =>{
        console.log(bookingId);
        fetch(`https://cors-anywhere.herokuapp.com/http://ec2-3-20-203-149.us-east-2.compute.amazonaws.com/booking/delete`,{
            method:'DELETE',
            headers:{
                "Content-Type":"application/json",
                "bookingid":bookingId
              }
        }).then((result)=>{
            result.text().then((resp)=>{
                console.log(resp);
                if(resp === "Deleted successfully!"){
                    this.setState({message : resp});
                  this.setState({variant:"success"});
                  this.setState({show:true});
                  let newBooking = this.state.bookings.filter(x => x.bookingId !== bookingId);
                  this.setState({bookings:newBooking});
                }
                else{
                    this.setState({message : resp});
                  this.setState({variant:"danger"});
                  this.setState({show:true});
                }
            })
        })
    }

    render(){ 
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
   }Bookings</button></div>
        <div>{this.state.bookings.map(booking =>
        (<CounterBooking  key={booking.bookingId}
            booking={booking}
            // onSubmit = {this.onSubmit} 
          onDelete={this.handleDelete}
        //    resident={resident}
        >
             
             </CounterBooking>))}</div>
             </React.Fragment> );
    }
}
 
export default ListBookings;