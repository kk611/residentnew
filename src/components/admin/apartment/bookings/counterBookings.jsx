import React, { Component } from 'react';

class CounterBooking extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( <React.Fragment>
            <div className="counterNotice">
                <div className="noticeTitle">
                Owner Name: {this.props.booking.ownerName}
                <div className="deletecounter"><button onClick={()=>this.props.onDelete(this.props.booking.bookingId)}
            className="btn btn-danger btn-sm m-2" >
        Delete</button></div>
            </div>  
            <br/>
            <div className="noticeContent">
                Amenity Name: {this.props.booking.amenityName}<br/>
            (Booking for:{this.props.booking.bookingDate})<br/>
            Time:{this.props.booking.start}-{this.props.booking.end}
                </div>         
                </div> 

        </React.Fragment>  );
    }
}
 
export default CounterBooking;