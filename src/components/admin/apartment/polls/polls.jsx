import React, { Component } from 'react';
import CounterPoll from './counterPolls';
import {Modal ,Alert, Spinner} from 'react-bootstrap';

class Polls extends Component {
    constructor(props) {
        super(props);
        this.state = { polls:[],toggle:false,
             show : false,
            message:"",
            variant:""}
    }

    handleClose = () =>{
        
        this.setState({show:false});
        console.log("close called");
        
    }

    getList = () =>{
        this.setState({toggle:true})
        fetch(`https://cors-anywhere.herokuapp.com/http://ec2-3-20-203-149.us-east-2.compute.amazonaws.com/poll/list?limit=1000000`,{
            method:"POST",
            headers:{
              "Content-Type":"application/json"
            }
            //body:JSON.stringify(this.state)
          }).then((result)=>{
              result.json().then((resp)=>{

                let data = resp.polls;

                let newData = data.map(x =>({
                    pollId:x._id,
                    title:x.title,
                    pollOptions:x.polloptions,
                    authorId:x.user._id,
                    autherName:x.user.username,
                    apartmentId:x.user.apartment._id
                }))
                let newPoll = newData.filter(x => x.apartmentId === this.props.apartment.id);
                console.log(newPoll);
                this.setState({polls:newPoll});
                this.setState({toggle:false});
              });
          });
    }

    handleDelete = (pollId,authorId) =>{
        console.log(authorId,pollId);
        fetch(`https://cors-anywhere.herokuapp.com/http://ec2-3-20-203-149.us-east-2.compute.amazonaws.com/poll/delete`,{
            method:'DELETE',
            headers:{
                "Content-Type":"application/json",
                "pollid":pollId,
                "userid":authorId
              }
        }).then((result)=>{
            result.text().then((resp)=>{
                console.log(resp);
                if(resp === "deleted successful"){
                    this.setState({message : resp});
                  this.setState({variant:"success"});
                  this.setState({show:true});
                  let newPolls = this.state.polls.filter(x => x.pollId !== pollId);
                  this.setState({polls:newPolls});
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
        return (<React.Fragment>

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

            <div><button className="btn btn-primary" onClick ={()=>this.getList() }>{
      this.state.toggle &&
      <Spinner
      as="span"
      animation="border"
      size="sm"
      role="status"
      aria-hidden="true"
    />
   }Polls</button></div>
            <div>
                {this.state.polls.map(poll =>(
                    <CounterPoll key ={poll.pollId}
                    poll= {poll}
                    onDelete={this.handleDelete}>

                    </CounterPoll>
                ))}
            </div>
        </React.Fragment>);
    }
   
}
 
export default Polls;