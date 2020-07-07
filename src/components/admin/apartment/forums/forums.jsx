import React, { Component } from 'react';
import CounterForum from "./counterForums";
import {Modal ,Alert, Spinner} from 'react-bootstrap';
class Forums extends Component {
    constructor(props) {
        super(props);
        this.state = { forums:[],toggle:false,
            show : false,
            message:"",
            variant:"" }
        // this.handleClose = this.handleClose.bind(this)
        // this.setShow = this.setShow.bind(this)
    }

    


    handleClose = () =>{
        
        this.setState({show:false});
        console.log("close called");
        
    }

    // setShow = (val) => {
        
    //     this.setState({show:val});
    //     console.log("setshow called");
    // }

    getList = () =>{
      this.setState({toggle:true});
        fetch(`https://cors-anywhere.herokuapp.com/http://ec2-3-20-203-149.us-east-2.compute.amazonaws.com/post/list?limit=1000000`,{
            method:"POST",
            headers:{
              "Content-Type":"application/json"
            }
            //body:JSON.stringify(this.state)
          }).then((result)=>{
              result.json().then((resp)=>{

                let data = resp.forums;

                const newData = data.map(x =>({imageAWSLinks:x.imageAWSLinks,
                    fileAWSLinks:x.fileAWSLinks,
                    comments:x.comments,
                    upVotes:x.upVotes,
                    downVotes:x.downVotes,
                    voteTotal:x.voteTotal,
                    postId:x._id,
                    title:x.title,
                    content:x.content,
                    authorId:x.author._id,
                    autherName:x.author.username
                }))

                console.log(newData);
                this.setState({forums:newData});
                this.setState({toggle:false});
              });
          });
    }

    handleDelete = (postId) =>{
        console.log(postId);
        fetch(`https://cors-anywhere.herokuapp.com/http://ec2-3-20-203-149.us-east-2.compute.amazonaws.com/post/delete`,{
            method:"DELETE",
            headers:{
              "Content-Type":"application/json",
              "postId":postId
            }
            //body:JSON.stringify(this.state)
          }).then((result)=>{
              result.json().then((resp)=>{
                  if(resp.isSuccessful=== true){
                  const newForums = this.state.forums.filter(x=>(x.postId !== postId));
                  this.setState({forums:newForums});
                  console.log(this.state.forums.length);
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
   }Forum</button></div>
        <div>{this.state.forums.map(forum =>
        (<CounterForum  key={forum.postId}
            forum={forum}
            // onSubmit = {this.onSubmit} 
          onDelete={this.handleDelete}
        //    resident={resident}
        >
             
             </CounterForum>))}</div>
             </React.Fragment>  );
    }
}
 
export default Forums;