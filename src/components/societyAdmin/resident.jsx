import React, { Component } from 'react';
import CounterResident from './counterResident';
class Resident extends Component {
    state = { residents:[] }

    getList = () =>{
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
       })
        this.setState({residents:residents})
      }

    render() { 
        return ( <React.Fragment><div><button className="btn btn-primary" 
        onClick ={()=>{this.getList()}}>Residents</button></div>
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