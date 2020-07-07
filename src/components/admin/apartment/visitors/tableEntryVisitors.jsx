import React, { Component } from 'react';
import {Modal, Button,Form } from 'react-bootstrap';
class TableEntryVisitor extends Component {
    constructor(props) {
        super(props);
        this.state = { show:false }
    }
    style={width:'40px',
    height:'40px',
    OObjectFit:'contain',
    }

    modalStyle={width:'160px',
    height:'160px',
    OObjectFit:'contain',
    }

    handleShow = () =>{
        
        this.setState({show:true});
        console.log("close called");
        
    }
    handleClose = () =>{
        
        this.setState({show:false});
        console.log("close called");
        
    }

    render() { 
        return ( <tr>
            <th scope="row" ><img style={this.style} src={this.props.visitor.visitorPhotoUrl} alt="photo"/></th>
            <td>{this.props.visitor.visitorName}</td>
            <td>{this.props.visitor.ownerName}</td>
            <td>{this.props.visitor.createdAt}</td>
            <td>
            <Button size="sm"className={this.style}  variant="primary" onClick={this.handleShow}>
        Details
      </Button>

            <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="base-container">
        <div className="header">
        <div className="content">
        <div className="form">
            <div><img style={this.modalStyle} src={this.props.visitor.visitorPhotoUrl} alt="photo"/></div>
            
            </div>
            <ul>
        <li>Visitor:{this.props.visitor.visitorName}</li>
        
        <li>Owner:{this.props.visitor.ownerName}</li>
        <li>Apartment:{this.props.visitor.apartmentName}</li>
        <li>Phone:{this.props.visitor.visitorPhone}</li>
        <li>CheckIn Time:{this.props.visitor.checkIn}</li>
        <li>CheckOut Time:{this.props.visitor.checkOut}</li>
        <li>Date:{this.props.visitor.createdAt}</li>
        <li>Status:{this.props.visitor.status}</li>


        
            </ul>
          </div>
</div></div>
             </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
          
        </Modal.Footer>
      </Modal></td>
        </tr> );
    }
}
 
export default TableEntryVisitor;