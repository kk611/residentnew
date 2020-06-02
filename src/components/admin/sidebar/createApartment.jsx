import React, { Component } from 'react';
import { Alert } from 'antd';
class CreateApartment extends Component {
    constructor(props) {
        super(props);
        this.state = {
          name:""
        };
        this.newApartment = this.newApartment.bind(this)
      }
    

    newApartment = () => {
        console.log(this.state.name);
        fetch(`https://cors-anywhere.herokuapp.com/http://ec2-3-20-203-149.us-east-2.compute.amazonaws.com/apartment/create`,{
        method:"POST",
        headers:{
          
          "Content-Type":"application/json",
        },
        body:JSON.stringify(this.state)
      })

      //("#myAlert").alert('close');
      
    }

    render() { 
      //const message = (`#{message}`);
      //message.hide();
        return ( <React.Fragment>
           <div className="base-container" >
           
        <div className="header">create apartment</div>
        
        <div className="content">
            <div></div>
        <div className="form">
            <div className="form-group">
              <label >New Apartment Name</label>
              <input type="text" name="name" placeholder="Apartment name"
              onChange={(e) => {this.setState({name:e.target.value})} }/>
            </div>
            
          </div>
          

          </div>
        <div className="footer">
          <button type="button " className="btn btn-primary" onClick={()=> this.newApartment()}>
            Create
          </button>
        </div>
        
        </div>
        
        </React.Fragment> );
    }
}
 
export default CreateApartment;

/*
class CreateApartment extends Component {
    constructor(props) {
    super(props);
    this.state = { apname:"" }
        this.onChange = this.onChange.bind(this)
        this.newApartment=this.newApartment(this)
}
    ;

    newApartment = () => {
        console.log(e.target.value.name);
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    

    render() { 
        return ( <React.Fragment><div>create apartment</div>
        <div className="form">
            <div className="form-group">
              <label htmlFor="name">name</label>
              <input type="text" name="name" placeholder="name" value={this.state.name}
              onChange={this.onChange }/>
            </div>
            
          </div>
        
        <div className="footer">
          <button type="button" className="btn" onClick={()=> this.newApartment()}>
            Login
          </button>
        </div>
        </React.Fragment> );
    }
}
 */