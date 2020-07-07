import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../../css/counter.scss';
import PopupForm from "./editAmenities";

class CounterAmenties extends Component {
    state = { id:this.props.amenity.id }
    render() { 
        return ( <React.Fragment>
            <div className="counter">
                <div className="apartmentcounter">
                {this.props.amenity.name}
            </div>
             <div className="editcounter">
            <PopupForm  id={this.props.amenity.id} onSubmit = {this.props.onSubmit} amenity={this.props.amenity}/>
            </div> 
             <div className="deletecounter"><button onClick={()=>this.props.onDelete(this.props.amenity.id)}
            className="btn btn-danger btn-sm m-2" >
        Delete</button></div>
                </div> 

        </React.Fragment> );
    }
}
 
 export default CounterAmenties;

