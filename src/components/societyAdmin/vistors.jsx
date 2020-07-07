import React, { Component } from 'react';
import {Spinner} from 'react-bootstrap';
import {Row, Col, Card, Table} from 'react-bootstrap';
import TableEntryVisitor from './tableEntryVisitor';
class Visitors extends Component {
    constructor(props) {
        super(props);
        this.state = {visitors:[] ,toggle:false,show:false }
    }
    getList = () =>{
        this.setState({toggle:true});

        fetch(`https://cors-anywhere.herokuapp.com/http://ec2-3-20-203-149.us-east-2.compute.amazonaws.com/visitor/list`,{
           method:"POST",
           headers:{
             
           }
           //body:JSON.stringify(this.state)
         }).then((result)=>{
            result.json().then((resp)=>{
                if(resp.isSuccessful === true){
                    this.setState({show:true});
                }
                let data = resp.visitors;
                console.log(data);
                let visitors = data.filter(x=> x.visitor !== null);

                visitors = visitors.map(x=>{
                if(x.visitor !== null){
                    return ({id:x._id,
                apartmentId:x.apartment,
                visitorName:x.visitor.name,
                visitorPhone:x.visitor.phone,
                visitorRole:x.visitor.role,
                visitorPhotoUrl:x.visitor.photo,
                ownerId:x.owner._id,
                ownerName:x.owner.username,
                apartmentName:x.owner.apartment.name,
                checkIn:x.checkin,
                checkOut:x.checkout,
                status:x.status,
                createdAt:x.createdAt.slice(0,10)
                })}
            });
                console.log(visitors);
                const newVisitors = visitors.filter(x=> x.apartmentId === localStorage.getItem("apartmentId"));
                this.setState({visitors:newVisitors});
                this.setState({toggle:false});
            })
        })
    }
    render() { 
        return ( <React.Fragment><div><button className="btn btn-primary" 
        onClick ={()=>{this.getList()}}>
          {
      this.state.toggle &&
      <Spinner
      as="span"
      animation="border"
      size="sm"
      role="status"
      aria-hidden="true"
    />
   }Visitors</button></div>


{
      this.state.show &&<Row>
                    <Col>
                        
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Visitors</Card.Title>
                                {/* <span className="d-block m-t-5">use props <code>hover</code> with <code>Table</code> component</span> */}
                            </Card.Header>
                            <Card.Body>
                                <Table responsive hover>
                                    <thead>
                                    <tr>
                                        <th>photo</th>
                                        
                                        <th>Name</th>
                                        <th>Resident</th>
                                        <th>Date</th>
                                        <th>Details</th>
                                        {/* <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Username</th>
                                        <th>First Name</th> */}

                                    </tr>
                                    </thead>
                                    <tbody>

                                    {this.state.visitors.map(visitor =>(
                                        <TableEntryVisitor key={visitor.id}
                                        visitor = {visitor}
                                        ></TableEntryVisitor>
                                    ))}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                        
                    </Col>
                </Row>}
                </React.Fragment>
   );
    }
}
 
export default Visitors;