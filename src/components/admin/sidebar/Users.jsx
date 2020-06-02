import React, { Component } from 'react';
import CounterUser from "./counterUser";
import ReactSearchBox from "react-search-box";
class Users extends Component {
    state = { users:[],userList:[] }
    


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
               let newdata = data.map(x => ({id:x._id,username:x.username, email:x.email,password:x.password,apartmentId:x.apartment,staff:x.staff,role:x.role,createdAt:x.createdAt}));
               //let {"key":id, "value":username} = newdata;
               
               this.setState({users:newdata});
               const userList = data.map(x => ({"key":x._id,"value":x.username}));

               console.log(userList);
               this.setState({userList:userList});
    
           })
         })
    }

    handleDelete = (counterId) =>{
        console.log("handler called",counterId );
        const users = this.state.users.filter(c => c.id !== counterId);
        console.log(users);
        fetch(`https://cors-anywhere.herokuapp.com/http://ec2-3-20-203-149.us-east-2.compute.amazonaws.com/user/delete`,{
         method:"DELETE",
         headers:{
            
           "userid":counterId,
           "Content-Type":"application/json",
         }
         //body:JSON.stringify(this.state)
       })
        this.setState({users:users})
      }

      onSubmit = (id,updatedInfo) => {
        //this.props.apartment.name = val;
        //this.setState({name:val});

        const users = [...this.state.users];
        

        const index = users.findIndex(i =>i.id === id);
        users[index] = {id};
        users[index].username = updatedInfo.username;
        users[index].email = updatedInfo.email;
        users[index].password = updatedInfo.password;
        users[index].role = updatedInfo.role;
        users[index].apartmentId = updatedInfo.apartmentId;
        //console.log("aps",this.state.apartments[index]);
        this.setState({users});
        //const query = {"name":val};
        console.log(users[index]);
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
        return ( <React.Fragment><div><button className="btn btn-primary" 
        onClick ={()=>{this.getList()}}>Users</button></div>
        {/* <div className="form-group">
              <label >Username</label>
              <ReactSearchBox placeholder="Username" data={this.state.userList} >
                                    </ReactSearchBox></div> */}
                                    <div>{this.state.users.map(user =>
        (<CounterUser  key={user.id}
            onSubmit = {this.onSubmit} 
          onDelete={this.handleDelete}
           user={user}>
             
             </CounterUser>))}</div>
        
             </React.Fragment> );
    }
}
 
export default Users;


