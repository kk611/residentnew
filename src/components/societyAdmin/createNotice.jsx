import React, { Component } from 'react';
import { Result } from 'antd';
import {Modal ,Alert, Spinner} from 'react-bootstrap';

class CreateNotice extends Component {
    constructor(props) {
        super(props);

    this.state = {show : false,
      message:"",
      variant:""
            }
        }

        handleClose = () =>{
        
          this.setState({show:false});
          console.log("close called");
          
      }

    createNotice = () =>{
        let author = localStorage.getItem("Id");
        console.log(author);
        this.setState({author:author });
        let date = JSON.stringify(new Date().getDate())+"-"+JSON.stringify(new Date().getMonth())+"-"+JSON.stringify(new Date().getFullYear());
        this.setState({noticeDate:date});
        console.log(this.state);
        let query = {"authorId":author,"content":this.state.content,"title":this.state.title, "noticeDate":date}; 

        fetch(`https://cors-anywhere.herokuapp.com/http://ec2-3-20-203-149.us-east-2.compute.amazonaws.com/notice/create`,{
           method:"POST",
           headers:{
             "Content-Type":"application/json"
           },
           body:JSON.stringify(query)
         }).then((result)=>{
           result.json().then((resp)=>{
             if(resp.isSuccessful === true){
              this.setState({message : resp.message});
              this.setState({variant:"success"});
              this.setState({show:true});
             }
             else{
              this.setState({message : resp.message});
              this.setState({variant:"danger"});
              this.setState({show:true});
             }
           })
         })
    } 

    
    style = {
        minHeight: 200
        
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
            <div className="base-container" >
           
           <div className="header">Create Notice</div>
           
           <div className="content">
               <div></div>
           <div className="form">
               <div className="form-group">
                 <label >Notice title</label>
                 <input type="text" name="name" placeholder="Amenity name"
                 onChange={(e) => {this.setState({title :e.target.value})} }/>
               </div>
   
               <div className="form-group" >
                 <label >Notice content</label>
                 <input  type="text" style = {{resize:"vertical"}} name="description" placeholder="Description"
                 onChange={(e) => {this.setState({content :e.target.value})} }/>
               </div>
               
             </div>
             
   
             </div>
           <div className="footer">
             <button type="button " className="btn btn-primary" onClick={()=> this.createNotice()}>
               Create
             </button>
           </div>
           
           </div>
        </React.Fragment> );
    }
}
 
export default CreateNotice;