import React, {useEffect} from 'react';
import axios from 'axios'; // 리액트가 req를 server에 보낼 수 있도록 함

import {
  withRouter
} from "react-router-dom";

function RootPage(props){
  useEffect(() => {
    axios.get('/api/hello')
    .then(response=> {console.log(response)})
  }, [])

  const onClickHandler = () => {
    axios.get('/api/user/logout').then(response => {
      if (response.data.success){
        props.history.push('/');
      } else {
        alert('Error');
      }
    })
  }

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh'
    }}>
      RootPage
      <button onClick={onClickHandler}>
        Sign out
      </button>
    </div>
  )
}

export default withRouter(RootPage)
