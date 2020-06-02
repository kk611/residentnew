import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import Sider from "./Sider";
import { Layout, Button, Row, Breadcrumb, Switch } from "antd";
import {Icon} from "antd";
import Cal from "./Cal";
import ToDoList from "./ToDoList";
import ButtonSize from "./ButtonSize";
import Progress from './Progress'
import Complete from './Complete'
import Apartment from "./apartment";
import CreateApartment from "./createApartment";
import Logout from "../../login/logout";
import Users from "./Users";
import CreateUser from "./createUser";
import CreateSuperAdmin from "./createSuperAdmin";
class Sidebar extends React.PureComponent {
  state = {
    collapsed: false,
    mode: "inline",
    theme: "light",
    content: <CreateApartment/>
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
  onToggleCalendar = () => {
    this.setState(prevState => ({ content: <Cal /> }));
  };
  onToggleToDoList = () => {
    this.setState(prevState => ({ content: <ToDoList /> }));
  };
  onToggleButtonSize = () => {
    this.setState(prevState => ({ content: <ButtonSize /> }));
  };
  onToggleProgress = () => {
    this.setState(prevState => ({ content: <Progress /> }));
  }
  onToggleComplete = () => {
    this.setState(prevState => ({ content: <Complete /> }));
  }
  onToggleListApartment = () => {
    this.setState(prevState => ({ content: <Apartment /> }));
  }
  onToggleCreateApartment = () => {
    this.setState(prevState => ({ content: <CreateApartment /> }));
  }

  onToggleLogout = () =>{
    this.setState(prevState => ({content: <Logout/>}))
  }

  onToggleUsers = () => {
  this.setState(prevState => ({content: <Users/>}))
  }
  onToggleCreateUser = () => {
    this.setState(prevState => ({content: <CreateUser/>}))
  }

  onToggleCreateSuperAdmin = () => {
    this.setState(prevState => ({content: <CreateSuperAdmin/>}))
  }

  render() {
    return (
      <Layout>
        <Sider
          collapsed={this.state.collapsed}
          mode={this.state.mode}
          theme={this.state.theme}
          onToggleCreateSuperAdmin={this.onToggleCreateSuperAdmin}
          onToggleCreateUser={this.onToggleCreateUser}
          onToggleUsers={this.onToggleUsers}
          onToggleCalendar={this.onToggleCalendar}
          onToggleToDoList={this.onToggleToDoList}
          onToggleButtonSize={this.onToggleButtonSize}
          onToggleProgress={this.onToggleProgress}
          onToggleComplete={this.onToggleComplete}
          onToggleListApartment={this.onToggleListApartment}
          onToggleCreateApartment={this.onToggleCreateApartment}
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

export default Sidebar;