import { Layout, Menu, Icon ,Switch} from 'antd';
import React from 'react'
const { SubMenu } = Menu;

class Sider extends React.PureComponent {
  // submenu keys of first level
  rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];
  state = {
    openKeys: [],
    
  };
  changeMode = (value) => {
    this.setState({
      mode: value ? 'vertical' : 'inline',
    });
  }
  changeTheme = (value) => {
    this.setState({
      theme: value ? 'dark' : 'light',
    });
  }

  onOpenChange = (openKeys) => {
    console.log(openKeys);
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    console.log(latestOpenKey);
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
    console.log(openKeys);
  }

  onToggleCalendar = () => {
    this.props.onToggleCalendar()
  }
  onToggleToDoList = () => {
    this.props.onToggleToDoList()
  }
  onToggleButtonSize = () => {
    this.props.onToggleButtonSize()
  }
  onToggleProgress = () => {
    this.props.onToggleProgress()
  }
  onToggleComplete = () => {
    this.props.onToggleComplete()
  }
  onToggleListApartment = () =>{
    this.props.onToggleListApartment();
  }

  onToggleCreateApartment = () =>{
    this.props.onToggleCreateApartment();
  }

  onToggleLogout = () =>{
    this.props.onToggleLogout();
  }

  onToggleUsers = () =>{
    this.props.onToggleUsers()
  }

  onToggleCreateUser = () =>{
    this.props.onToggleCreateUser()
  }

  onToggleCreateSuperAdmin = () => {
    this.props.onToggleCreateSuperAdmin()
  }

  render() {
    const {                 //ย่อcodeส่วนprops 
      collapsed    ,         // จริงๆ คือ this.props.collapsed
      mode ,
      theme ,
    } = this.props
   

    return (
      <Layout.Sider collapsed={collapsed} theme={theme} style={{ minHeight: '100vh'}}>
        <div className="logo" />
        

        <Menu 
          mode={mode}
          theme={theme}
          defaultSelectedKeys={['0']}
          openKeys={this.state.openKeys}
          onOpenChange={this.onOpenChange}
        >


          <Menu.Item key="1" style={{ height: 52 }}  >
            <Icon type="user" />
            <span className="nav-text" >User </span>
          </Menu.Item>

          
          <SubMenu
            key="sub1"
            title={<span><Icon type="team" /><span>Apartment</span></span>}
          >
            <Menu.Item key="2" onClick={this.onToggleCreateApartment}>Create Apartment</Menu.Item>
            <Menu.Item key="3" onClick={this.onToggleListApartment}>List Apartments</Menu.Item>
          </SubMenu>

          <SubMenu
            key="sub2"
            title={<span><Icon type="team" /><span>Users</span></span>}
          >
            <Menu.Item key="4" onClick={this.onToggleUsers}>List Users</Menu.Item>
            <Menu.Item key="5" onClick={this.onToggleCreateUser}>Create User</Menu.Item>
            <Menu.Item key="6" onClick={this.onToggleCreateSuperAdmin}>Create Superadmin</Menu.Item>
          </SubMenu>

          <SubMenu key="sub3" 
          title={<span><Icon type="team" /><span>Logout</span></span>}>
          <Menu.Item key="7"  onClick={this.onToggleLogout} >
            <Icon type="user" />
            <span className="nav-text" >Click to Logout</span>
          </Menu.Item>
          </SubMenu>
        </Menu>
      </Layout.Sider>

    )
  }

}

export default Sider