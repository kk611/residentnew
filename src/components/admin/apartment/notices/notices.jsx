import React, { Component } from 'react';
import CounterNotice from "./counterNotices";
import {Modal ,Alert, Spinner, Tab, Tabs} from 'react-bootstrap';
import CreateNotice from './createNotice';
class Notices extends Component {
    constructor(props){
        super(props);

    this.state = { notices:[],toggle:false ,show : false,
      message:"",
      variant:""}
    }

      handleClose = () =>{
        
        this.setState({show:false});
        console.log("close called");
        
    }

    getList = () =>{
        this.setState({toggle:true});
        fetch(`https://cors-anywhere.herokuapp.com/http://ec2-3-20-203-149.us-east-2.compute.amazonaws.com/notice/list?limit=1000000`,{
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
               let newdata = data.notices.map(x => ({noticeId:x._id,title:x.title,content:x.content, noticeDate:x.noticeDate, authorId:x.author}));

                const authorId = this.props.societyAdmin[0].id;
                console.log(authorId);
                console.log(this.props.societyAdmin[0].id);
                let notices = newdata.filter(notice => notice.authorId === authorId)
               console.log("1",notices);
               this.setState({notices:notices});
               this.setState({toggle:false});
           })
         });

         
    }

    handleAddition = (notice) =>{
        let newdata = notice.map(x => ({noticeId:x._id,title:x.title,content:x.content, noticeDate:x.noticeDate, authorId:x.author}));
        let notices = this.state.notices;
        notices.push(newdata[0]);
        this.setState({notices:notices});
    }
  

    handleDelete = (noticeId) =>{
      console.log(noticeId);
      fetch(`https://cors-anywhere.herokuapp.com/http://ec2-3-20-203-149.us-east-2.compute.amazonaws.com/notice/delete`,{
          method:'DELETE',
          headers:{
              "Content-Type":"application/json",
              "noticeid":noticeId
            }
      }).then((result)=>{
          result.text().then((resp)=>{
              console.log(resp);
              if(resp === "Deleted successfully!"){
                  this.setState({message : resp});
                this.setState({variant:"success"});
                this.setState({show:true});
                let newNotices = this.state.notices.filter(x => x.noticeId !== noticeId);
                this.setState({notices:newNotices});
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
            <Tabs  defaultActiveKey="create" className="mb-3"> 
            <Tab eventKey="create" title="Create">

                <CreateNotice author = {this.props.societyAdmin} handleAddition={this.handleAddition} />
            </Tab>
            <Tab eventKey="list" title="List">
          <div><button className="btn btn-primary" 
        onClick ={()=>{this.getList()}}>{
          this.state.toggle &&
          <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />
       }Notices</button></div>
        <div>{this.state.notices.map(notice =>
        (<CounterNotice  key={notice.noticeId}
            notice={notice}
            // onSubmit = {this.onSubmit} 
          onDelete={this.handleDelete}
        //    resident={resident}
        >
            
             
             </CounterNotice>))}</div>
             </Tab>
             </Tabs>
             </React.Fragment> );
    }
}
 
export default Notices;