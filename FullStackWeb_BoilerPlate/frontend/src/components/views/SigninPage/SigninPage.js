import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';

import { loginUser } from '../../../_actions/user_action.js'
import {
  withRouter
} from "react-router-dom";

function SigninPage(props){
  const dispatch = useDispatch();
  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value)
  }
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value)
  }
  const onSubmitHandler = (event) => {
    event.preventDefault(); // submit시 페이지 refresh를 막아줌

    let body = {
      Email: Email,
      Password: Password
    }

    dispatch(loginUser(body)).then(response => {
      if (response.payload.loginSuccess) {
        props.history.push('/')
      } else {
        alert('Error');
      }
    });
  }

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh'
    }}>
      <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={onSubmitHandler}>
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />
        <button type="submit">
          Sign in
        </button>
      </form>
    </div>
  )
}

export default withRouter(SigninPage)
