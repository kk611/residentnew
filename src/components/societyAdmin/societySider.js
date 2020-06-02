import { Layout, Menu, Icon ,Switch} from 'antd';
import React from 'react'
const { SubMenu } = Menu;


class SocietySider extends React.PureComponent {
  // submenu keys of first level
  rootSubmenuKeys = ['sub1', 'sub2', 'sub3','sub4'];
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


  onToggleButtonSize = () => {
    this.props.onToggleButtonSize()
  }

  onToggleListAmenity = () =>{
    this.props.onToggleListAmenity()
  }

  onToggleCreateAmenity = () => {
    this.props.onToggleCreateAmenity()
  }

  onToggleLogout = () =>{
    this.props.onToggleLogout()
  }

  onToggleResidents = () =>{
    this.props.onToggleResidents()
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
            title={<span><Icon type="team" /><span>Amenities</span></span>}
          >
            <Menu.Item key="2" onClick={this.onToggleCreateAmenity}>Create Amenity</Menu.Item>
            <Menu.Item key="3" onClick={this.onToggleListAmenity}>List Amenity</Menu.Item>
          </SubMenu>

          <SubMenu
            key="sub2"
            title={<span><Icon type="team" /><span>Residents</span></span>}
          >
            <Menu.Item key="4" onClick={this.onToggleResidents}>List Residents</Menu.Item>
            {/* <Menu.Item key="3" onClick={this.onToggleListAmenity}>List Amenity</Menu.Item> */}
          </SubMenu>


          <SubMenu key="sub3" 
          title={<span><Icon type="team" /><span>Logout</span></span>}>
          <Menu.Item key="5"  onClick={this.onToggleLogout} >
            <Icon type="user" />
            <span className="nav-text" >Click to Logout</span>
          </Menu.Item>
          </SubMenu>
        </Menu>
      </Layout.Sider>

    )
  }

}

export default SocietySider