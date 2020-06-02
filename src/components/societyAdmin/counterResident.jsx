import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/counter.scss';
class CounterResident extends Component {
    state = { id:this.props.resident.id }
    render() { 
        return ( <React.Fragment>
            <div className="counter">
                <div className="apartmentcounter">
                {this.props.resident.username}
            </div>           
              {/* <div className="editcounter">
            <PopupForm  id={this.props.amenity.id} onSubmit = {this.props.onSubmit} amenity={this.props.amenity}/>
            </div>  */}
             <div className="deletecounter"><button onClick={()=>this.props.onDelete(this.props.resident.id)}
            className="btn btn-danger btn-sm m-2" >
        Delete</button></div> 
                </div> 

        </React.Fragment> );
    }
}
 
export default CounterResident;
