import React, { Component } from 'react';
import CounterResident from './counterResident';
import {Modal ,Alert, Spinner} from 'react-bootstrap';
class Resident extends Component {
    state = { residents:[],toggle:false,show : false,
      message:"",
      variant:"" }
    handleClose = () =>{
        
      this.setState({show:false});
      console.log("close called");
      
  }
    getList = () =>{
      this.setState({toggle:true})
        fetch(`https://cors-anywhere.herokuapp.com/http://ec2-3-20-203-149.us-east-2.compute.amazonaws.com/user/list`,{
           method:"POST",
           headers:{
             
           }
           //body:JSON.stringify(this.state)
         }).then((result)=>{
           result.json().then((resp)=>{
               
               //JSON.parse(resp);
               let data = resp;
               
               
               console.log(data);
               let newdata = data.map(x => ({id:x._id,username:x.username, email:x.email,apartmentId:x.apartment}));
            //    let residents = newdata.filter(x => {
            //     console.log("A",x.apartmentId);  
            //     console.log("B",localStorage.getItem("apartmentId")); 
            //     if(x.apartmentId === localStorage.getItem("apatmentId"))
            //    return true;
            //    }) 
                const apartmentId = localStorage.getItem("apartmentId");
                console.log(apartmentId);
                let residents = newdata.filter(resident => resident.apartmentId === apartmentId)
               console.log("1",residents);
               this.setState({residents:residents});
               this.setState({toggle:false})
           })
         })
    }

    handleDelete = (counterId) =>{
        console.log("handler called",counterId );
        const residents = this.state.residents.filter(c => c.id !== counterId);
        console.log(residents);
        fetch(`https://cors-anywhere.herokuapp.com/http://ec2-3-20-203-149.us-east-2.compute.amazonaws.com/user/delete`,{
         method:"DELETE",
         headers:{
            
           "userid":counterId,
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
              this.setState({residents:residents})
            }
            else{
                this.setState({message : resp});
              this.setState({variant:"danger"});
              this.setState({show:true});
            }
        })
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
   }Residents</button></div>
        <div>{this.state.residents.map(resident =>
        (<CounterResident  key={resident.id}
            // onSubmit = {this.onSubmit} 
         onDelete={this.handleDelete}
           resident={resident}>
             
             </CounterResident>))}</div>
             </React.Fragment> );
    }
}
 
export default Resident;