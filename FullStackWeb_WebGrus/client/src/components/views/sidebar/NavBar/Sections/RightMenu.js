/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Menu } from 'antd';
import axios from 'axios';
import { USER_SERVER } from '../../../../Config';
import { useSelector } from "react-redux";

import {
  useLocation,
  useNavigate,
  useParams
} from "react-router-dom";

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return (
      <Component
        {...props}
        router={{ location, navigate, params }}
      />
    );
  }

  return ComponentWithRouterProp;
}

function RightMenu(props) {
  let navigate = useNavigate();
  const user = useSelector(state => state.user)

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then(response => {
      if (response.status === 200) {
        navigate("/login");
      } else {
        alert('Log Out Failed')
      }
    });
  };

  if (user.userData && !user.userData.isAuth) {
    if (user.userData.id) {
      return (
        <Menu style={{ width: 256 }} mode="vertical">
          <Menu.Item>승인 대기 중</Menu.Item>
          <Menu.Item>
            <a onClick={logoutHandler}>Logout</a>
          </Menu.Item>
        </Menu>
      );
    } else {
      return (
        <Menu style={{ width: 256 }} mode="vertical">
          <Menu.Item>
            <a href="/login">로그인</a>
          </Menu.Item>
          <Menu.Item>
            <a href="/register">회원가입</a>
          </Menu.Item>
        </Menu>
      );
    }
  } else {
    if (user.userData.role === 2) {
      return (
      <Menu style={{ width: 256 }} mode="vertical">
        <Menu.Item>
          <a href="/admin">회원  관리</a>
        </Menu.Item>
        <Menu.Item>
          <a onClick={logoutHandler}>로그아웃</a>
        </Menu.Item>
      </Menu>)
    } else {
      return (
        <Menu style={{ width: 256 }} mode="vertical">
          <Menu.Item>
            <a onClick={logoutHandler}>로그아웃</a>
          </Menu.Item>
        </Menu>
      )
    }
  }
}

export default withRouter(RightMenu);
