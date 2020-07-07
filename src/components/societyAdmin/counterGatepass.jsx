import React, { Component } from 'react';

class CounterGatepass extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( <React.Fragment>
            <div className="counterNotice">
                <div className="noticeTitle">
                Owner Name: {this.props.gatePass.ownerName}
                {/* <div className="deletecounter"><button onClick={()=>this.props.onDelete(this.props.gatePass.gatePassId)}
            className="btn btn-danger btn-sm m-2" >
        Delete</button></div> */}
            </div>  
            <br/>
            <div className="noticeContent">
                Visitor Name: {this.props.gatePass.visitorName}<br/>
            (Created on date:{this.props.gatePass.createdDate})<br/>
                (Expires on date:{this.props.gatePass.expiryDate})
                </div>         
                </div> 

        </React.Fragment> );
    }
}
 
export default CounterGatepass;