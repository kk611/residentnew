import React, { Component } from 'react';

class CounterPoll extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( <React.Fragment>
            <div className="counterNotice">
                <div className="noticeTitle">
                Forum Auther: {this.props.poll.autherName}
                <div className="deletecounter"><button
                 onClick={()=>this.props.onDelete(this.props.poll.pollId,
                    this.props.poll.authorId)}
            className="btn btn-danger btn-sm m-2" >
        Delete</button></div>
            </div>  
            <br/>
            <div className="noticeContent">
                poll: {this.props.poll.title}<br/>
    <div>{this.props.poll.pollOptions.map(pollOption =>(
       <a>[{ pollOption.value} :{ pollOption.count }]  </a> 
  ))}</div>
            {/* options:{this.props.poll.pollOptions}<br/> */}
            {/* upvotes:{this.props.forum.upVotes}   |   downvotes:{this.props.forum.downVotes} */}
                </div>         
                </div> 

        </React.Fragment>  );
    }
}
 
export default CounterPoll;