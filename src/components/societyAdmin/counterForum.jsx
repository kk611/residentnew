import React, { Component } from 'react';

class CounterForum extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (<React.Fragment>
            <div className="counterNotice">
                <div className="noticeTitle">
                Forum Auther: {this.props.forum.autherName}
                <div className="deletecounter"><button onClick={()=>this.props.onDelete(this.props.forum.postId)}
            className="btn btn-danger btn-sm m-2" >
        Delete</button></div>
            </div>  
            <br/>
            <div className="noticeContent">
                Forum Name: {this.props.forum.title}<br/>
            Post:{this.props.forum.content}<br/>
            upvotes:{this.props.forum.upVotes}   |   downvotes:{this.props.forum.downVotes}
                </div>         
                </div> 

        </React.Fragment>   );
    }
}
 
export default CounterForum;