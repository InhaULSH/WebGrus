import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { auth } from '../_actions/user_action.js'

export default function(SpecificComponent, option, adminRoute = null) {
  // option => null - 아무나 출입이 가능, true -> 로그인한 유저만 출입, false -> 로그인한 유저는 출입 X
  function AuthenticationCheck(props){
    let user = useSelector(state => state.user);
    
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(auth()).then(response => {
        console.log(response.data);
        if (!response.payload.isAuth){
          if (option == true){
            props.history.push('/login')
          }
        } else {
          if (adminRoute && !response.payload.isAdmin){
            props.history.push('/')
          } else {
            if (option == true){
              props.history.push('/login')
            }
          }
        }
      })
    }, [])

    return (
      <SpecificComponent />
    )
  }
  return AuthenticationCheck
}
