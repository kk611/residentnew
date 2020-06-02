import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import Sider from "./Sider";
import { Layout, Button, Icon, Row, Breadcrumb, Switch } from "antd";
import Cal from "./Cal";
import ToDoList from "./ToDoList";
import ButtonSize from "./ButtonSize";
import Progress from './Progress'
import Complete from './Complete'

class App extends React.PureComponent {
  state = {
    collapsed: false,
    mode: "inline",
    theme: "light",
    content: <Cal />
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

  render() {
    return (
      <Layout>
        <Sider
          collapsed={this.state.collapsed}
          mode={this.state.mode}
          theme={this.state.theme}
          onToggleCalendar={this.onToggleCalendar}
          onToggleToDoList={this.onToggleToDoList}
          onToggleButtonSize={this.onToggleButtonSize}
          onToggleProgress={this.onToggleProgress}
          onToggleComplete={this.onToggleComplete}
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
              <Row style={{ textAlign: "center" }}>
                <div>
                  <h2>It is {new Date().toLocaleTimeString()}.</h2>
                </div>
              </Row>
              <Row>{this.state.content}</Row>
            </div>
          </Layout.Content>

          <Layout.Footer style={{ textAlign: "center" }}>
            Ant Design ©2016 Created by Ant UED
          </Layout.Footer>
        </Layout>
      </Layout>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("container"));
