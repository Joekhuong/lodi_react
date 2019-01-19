import React from 'react'
import { Switch, Route } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
import {AppContext} from './AppContext';

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const Main = () => {
  
  let { state } = React.useContext(AppContext);
  console.log(state);
  return (
    <main>
      <Switch>
        <PrivateRoute isAuthenticated={state.isAuthenticated} exact path='/' component={Home}/>
        <Route path='/login' component={Login}/>
        <Route path='/register' component={Register}/>
      </Switch>
    </main>
  )
}

export default Main
