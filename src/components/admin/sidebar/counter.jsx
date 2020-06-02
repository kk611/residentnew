import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../css/counter.scss';
import PopupForm from "./editApartment";
import EditAmenity from './editAmenity';
class Counter extends Component {
    state = { id:this.props.apartment.id 
        
    }

    
    

    render() { 
        return ( <React.Fragment>
            <div className="counter">
                <div className="apartmentcounter">
                {this.props.apartment.name}
            </div>
            <div className="editcounter">
            <PopupForm  id={this.props.apartment.id} onSubmitAmenity={this.props.onSubmitAmenity} onSubmit = {this.props.onSubmit} apartment={this.props.apartment}/>
            </div>
            <div className="deletecounter"><button onClick={()=>this.props.onDelete(this.props.apartment.id)}
            className="btn btn-danger btn-sm m-2" >
                Delete</button></div>
                <div className="editcounter">
            <EditAmenity  id={this.props.apartment.id} onUpdateAmenity={this.props.onUpdateAmenity} onDeleteAmenity={this.props.onDeleteAmenity} apartment={this.props.apartment}/>
            </div>
                </div>
        </React.Fragment> );
    }
}
export default Counter;

