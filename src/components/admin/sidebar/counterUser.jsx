import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../css/counter.scss';
import PopupForm from "./editUser";
class CounterUser extends Component {
    state = { id:this.props.user.id }
    render() { 
        return ( <React.Fragment>
            <div className="counter">
                <div className="apartmentcounter">
                {this.props.user.username}({this.props.user.role})
            </div>           
               <div className="editcounter">
            <PopupForm  id={this.props.user.id} onSubmit = {this.props.onSubmit} user={this.props.user}/>
            </div>  
              <div className="deletecounter"><button onClick={()=>this.props.onDelete(this.props.user.id)}
            className="btn btn-danger btn-sm m-2" >
        Delete</button></div>  
                </div> 

        </React.Fragment> );
    }
}
 
export default CounterUser;
