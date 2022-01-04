import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import RootPage from './components/views/RootPage/RootPage.js'
import LoadingPage from './components/views/LoadingPage/LoadingPage.js'
import SignupPage from './components/views/SignupPage/SignupPage.js'
import SigninPage from './components/views/SigninPage/SigninPage.js'
import Auth from './hoc/auth.js'

function App() {
  return (
    <Router>
      <div>
        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
          <Route exact path="/" component={Auth(RootPage, null)} />
          <Route path="/login" component={Auth(SigninPage, false)} />
          <Route path="/register" component={Auth(SignupPage, false)} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
