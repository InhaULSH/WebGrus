import React from 'react';
import { Menu } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
  return (
    <Menu style={{ width: 256 }} selectedKeys="Selected" mode="vertical">
    <Menu.Item>
      <a href="/notice">공지</a>
    </Menu.Item>
    <Menu.Item>
      <a href="/freeboard">게시판</a>
    </Menu.Item>
    <Menu.Item>
      <a href="/lectures">강의</a>
    </Menu.Item>
    <Menu.Item>
      <a href="/studygroups">스터디그룹</a>
    </Menu.Item>
    <Menu.Item>
      <a href="/contest">공모전</a>
    </Menu.Item>
    </Menu>
  )
}

export default LeftMenu
