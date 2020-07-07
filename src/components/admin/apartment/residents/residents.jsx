import React, { Component } from 'react';
import CounterResident from './counterResidents';
import {Modal ,Alert, Spinner , Tab, Tabs} from 'react-bootstrap';
import CreateUser from './createResident';
class Residents extends Component {
  constructor(props){
    super(props);
  
    this.state = { residents:[],toggle:false,show : false,
      message:"",
      variant:"" }
    }
    handleClose = () =>{
        
      this.setState({show:false});
      console.log("close called");
      
  }
    getList = () =>{
      this.setState({toggle:true})
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
          
                const apartmentId = this.props.apartment.id;
                console.log(newdata);
                let residents = newdata.filter(resident => resident.apartmentId === apartmentId);
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

      onSubmit = (id,updatedInfo) => {
        //this.props.apartment.name = val;
        //this.setState({name:val});

        const residents = [...this.state.residents];
        

        const index = residents.findIndex(i =>i.id === id);
        residents[index] = {id};
        residents[index].username = updatedInfo.username;
        residents[index].email = updatedInfo.email;
        residents[index].password = updatedInfo.password;
        residents[index].role = updatedInfo.role;
        residents[index].apartmentId = updatedInfo.apartmentId;
        //console.log("aps",this.state.apartments[index]);
        this.setState({residents});
        //const query = {"name":val};
        console.log(residents[index]);
        fetch(`https://cors-anywhere.herokuapp.com/http://ec2-3-20-203-149.us-east-2.compute.amazonaws.com/user/update`,{
        method:"PUT",
        headers:{
          "userid":id,
          "Content-Type":"application/json",
        },
        body:JSON.stringify(updatedInfo)
        //body:JSON.stringify(this.state)
      })
    }

    render() { 
        return ( <React.Fragment>

<Tabs  defaultActiveKey="resident" className="mb-3">
<Tab eventKey="resident" title="List Residents">
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
            onSubmit = {this.onSubmit} 
         onDelete={this.handleDelete}
           resident={resident}>
             
             </CounterResident>))}</div>
             </Tab>
             <Tab eventKey="createResident" title="Create Resident">
              <CreateUser apartment= {this.props.apartment}/>

             </Tab>
             </Tabs>
             </React.Fragment> );
    }
}
 
export default Residents;