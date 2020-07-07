import React, { Component } from 'react';

class CounterNotice extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( <React.Fragment>
            <div className="counterNotice">
                <div className="noticeTitle">
                {this.props.notice.title}   (Date:{this.props.notice.noticeDate})
                <div className="deletecounter"><button onClick={()=>this.props.onDelete(this.props.notice.noticeId)}
            className="btn btn-danger btn-sm m-2" >
        Delete</button></div> 
        </div>  
            <br/>
            <div className="noticeContent">
                {this.props.notice.content}
                </div>         
              {/* <div className="editcounter">
            <PopupForm  id={this.props.amenity.id} onSubmit = {this.props.onSubmit} amenity={this.props.amenity}/>
            </div>  */}
             
                </div> 

        </React.Fragment> );
    }
}
 
export default CounterNotice;