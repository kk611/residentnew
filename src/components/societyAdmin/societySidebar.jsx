import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import SocietySider from "./societySider";
import { Layout, Button, Row, Breadcrumb, Switch } from "antd";
import {Icon} from "antd";
import ToDoList from "./ToDoList";
import CreateAmenity from "./createAmenity";
import Logout from "../../../src/components/login/logout";
import Amenities from "./Amenities";
import Residents from "./resident";
import CreateNotice from "./createNotice";
import ListNotice from "./listNotice";
import ListGatePass from "./listGatePass";
import ListBookings from "./ListBookings";
import ListForum from "./listForum";
import ListPoll from "./listPoll";
import Visitors from "./vistors";
class SocietySidebar extends React.PureComponent {
  state = {
    collapsed: false,
    mode: "inline",
    theme: "light",
    content: <CreateAmenity/>
  };
  changeMode = value => {
    this.setState({
      mode: value ? "vertical" : "inline"
    });
  };
  changeTheme = value => {
    this.setState({
      theme: value ? "dark" : "light"
    });
  };
  toggleCollapsed = () => {
    this.setState(prevState => ({ collapsed: !prevState.collapsed }));
  };
 
  onToggleListAmenity = () => {
    this.setState(prevState => ({content:<Amenities/>}))
  }

  onToggleCreateAmenity =() =>{
    this.setState(prevState => ({content: <CreateAmenity /> }))
  }

  onToggleLogout = () =>{
    this.setState(prevState => ({content: <Logout/>}))
  }

  onToggleResidents = () =>{
    this.setState(prevState => ({content: <Residents/>}))
  }
  onToggleCreateNotice = () =>{
    this.setState(prevState => ({content : <CreateNotice/>}))
  }

  onToggleListNotice = () =>{
    this.setState(prevState =>({content : <ListNotice/>}))
  }

  onToggleListGatepass = () =>{
    this.setState(prevState =>({content : <ListGatePass/>}))
  }

  onToggleListBookings = () =>{
    this.setState(prevState => ({content: <ListBookings/>}))
  }

  onToggleListForum = () =>{
  this.setState(prevState => ({content: <ListForum/>}))
  }

  onToggleListPoll =  () =>{
    this.setState(prevState => ({content : <ListPoll/>}))
  }

  onToggleVisitors = () =>{
    this.setState(prevState => ({content: <Visitors/>}))
  }

  render() {
    return (
      <Layout>
        <SocietySider
          collapsed={this.state.collapsed}
          mode={this.state.mode}
          theme={this.state.theme}
          onToggleVisitors={this.onToggleVisitors}
          onToggleListPoll={this.onToggleListPoll}
          onToggleListForum={this.onToggleListForum}
          onToggleListBookings={this.onToggleListBookings}
          onToggleListGatepass={this.onToggleListGatepass}
          onToggleCreateNotice={this.onToggleCreateNotice}
          onToggleListNotice={this.onToggleListNotice}
          onToggleResidents={this.onToggleResidents}
          onToggleListAmenity={this.onToggleListAmenity}
          onToggleCreateAmenity={this.onToggleCreateAmenity}
          onToggleLogout={this.onToggleLogout}
        />
        <Layout>
          <Layout.Header style={{ padding: 5 }}>
            <Button
              type="primary"
              onClick={this.toggleCollapsed}
              //icon= { this.state.collapsed ? 'menu-unfold' : 'menu-fold' }
            >
              <Icon type={this.state.collapsed ? "menu-unfold" : "menu-fold"} />
            </Button>
            <span className="ant-divider" style={{ margin: "0 1em" }} />
            <Switch onChange={this.changeMode} />
            <span style={{ color: "pink" }}> Change Mode</span>
            <span className="ant-divider" style={{ margin: "0 1em" }} />
            <Switch onChange={this.changeTheme} />
            <span style={{ color: "lightblue" }}> Change Theme</span>
          </Layout.Header>

          <Layout.Content style={{ padding: "0 50px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
              <Row style={{ textAlign: "right" }}>
                <div>
                  <h2>Time :{new Date().toLocaleTimeString()}.</h2>
                </div>
              </Row>
              <Row>{this.state.content}</Row>
            </div>
          </Layout.Content>

          <Layout.Footer style={{ textAlign: "center" }}>
          </Layout.Footer>
        </Layout>
      </Layout>
    );
  }
}

export default SocietySidebar;