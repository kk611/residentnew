import React, { Component } from 'react';
import CounterGatepass from './counterGatepass';
import {Modal ,Alert, Spinner} from 'react-bootstrap';
class ListGatePass extends Component {
    constructor(props) {
        super(props);
        this.state = { residents:[],gatePass:[],toggle:false }
    }

    getGatePass = () =>{

        const apartmentId = localStorage.getItem("apartmentId");
        console.log(apartmentId);
        
        for(let  index =0 ; index< this.state.residents.length;index++){
            const ownerId = this.state.residents[index].id;
            console.log(ownerId);
            const ownerName = this.state.residents[index].username;

            //let query ={"apartmentid":apartmentId, "ownerid":ownerId};
            fetch(`https://cors-anywhere.herokuapp.com/http://ec2-3-20-203-149.us-east-2.compute.amazonaws.com/gatepass/list`,{
               method:"POST",
               headers:{
                   "Content-Type":"application/json",
                   "apartmentid":apartmentId,
                    "ownerid":ownerId
                 },
               //body:JSON.stringify(query)
            }).then((result)=> {
                result.json().then((resp)=>{

                   let data = resp.gatepass;
                   let newData = data.map(x => ({gatePassId:x._id, 
                       visitorId: x.visitor._id, 
                       visitorName:x.visitor.username, 
                       expiryDate:x.expiryDate,
                       createdDate:x.createdAt.slice(0,10),
                       qrLink:x.qrLink,
                       apartmentId:apartmentId,
                       ownerId:ownerId ,
                       ownerName:ownerName
                    }));
                   console.log(newData);
                   let newGatePass = this.state.gatePass;
                   for(let index=0;index<newData.length;index++){
                    newGatePass.push(newData[index]);
                   }
                   //newGatePass.sort((a, b) => a.createdDate.localeCompare(b.createdDate));
                   console.log(newGatePass);
                   this.setState({gatePass:newGatePass});
                   this.setState({toggle:false});
                })
            })
        }
    }

    

    getList = () =>{
        this.setState({toggle:true});
        this.setState({gatePass:[]});
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
            this.getGatePass();
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
       }GatePass</button></div>
        <div>{this.state.gatePass.map(gatePass =>
        (<CounterGatepass  key={gatePass.gatePassId}
            gatePass={gatePass}
            // onSubmit = {this.onSubmit} 
        //  onDelete={this.handleDelete}
        //    resident={resident}
        >
             
             </CounterGatepass>))}</div>
             </React.Fragment> );
    }
}
 
export default ListGatePass;