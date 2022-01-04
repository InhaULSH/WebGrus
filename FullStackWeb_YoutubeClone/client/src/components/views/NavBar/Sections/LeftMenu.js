import React from 'react';
import { Menu } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
  return (
    <Menu mode={props.mode} style={{ width: 256 }} mode="vertical">
    <Menu.Item key="mail">
      <a href="/">Introduce</a>
    </Menu.Item>
    <SubMenu title={<span>Notifications</span>}>
    </SubMenu>
    <SubMenu title={<span>Lectures</span>}>
    </SubMenu>
    <SubMenu title={<span>Study Groups</span>}>
    </SubMenu>
    <SubMenu title={<span>Contest Info</span>}>
    </SubMenu>
    </Menu>
  )
}

export default LeftMenu
