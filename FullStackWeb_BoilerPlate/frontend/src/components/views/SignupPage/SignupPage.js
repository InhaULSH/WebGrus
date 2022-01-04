import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { registerUser } from '../../../_actions/user_action.js'
import {
  withRouter
} from "react-router-dom";

function SignupPage(props) {
  const dispatch = useDispatch();

  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")
  const [Name, setName] = useState("")
  const [PasswordConfirm, setPasswordConfirm] = useState("")

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value)
  }
  const onNameHandler = (event) => {
    setName(event.currentTarget.value)
  }
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value)
  }
  const onPasswordConfirmHandler = (event) => {
    setPasswordConfirm(event.currentTarget.value)
  }
  const onSubmitHandler = (event) => {
    event.preventDefault(); // submit시 페이지 refresh를 막아줌

    if (Password !== PasswordConfirm) {
      return alert('Password and Password Confirm must be same!')
    }

    let body = {
      Name: Name,
      Email: Email,
      Password: Password
    }

    dispatch(registerUser(body)).then(response => {
      if (response.payload.success){
        props.history.push('/login')
      } else {
        alert('Fail to sign up')
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
        <label>Name</label>
        <input type="text" value={Name} onChange={onNameHandler} />
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />
        <label>Password Confirm</label>
        <input type="password" value={PasswordConfirm} onChange={onPasswordConfirmHandler} />
        <button type="submit">
          Sign up
        </button>
      </form>
    </div>
  )
}

export default withRouter(SignupPage)
