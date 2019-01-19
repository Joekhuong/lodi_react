import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Main from './Main';
import firebase from './Firebase';
import {AppContext} from './AppContext';

export default (props) => {
  // [A]
  let { state,dispatch } = React.useContext(AppContext);

  console.log(state);
  
  return (
      <AppDump {...props} context_state={state} dispatch={dispatch}/>
  );
}

class AppDump extends Component {
  constructor(props) {
    super(props);

    this.context_state = props.context_state;
    this.dispatch = props.dispatch;
  }

  componentDidMount() {
    var self = this;
    firebase.auth().onAuthStateChanged(function(user) {
      console.log(user);      
      if (user) {
        firebase.firestore().collection("users").doc(user.uid).get().then(function(doc){
          let user_info = doc.data();
          user.user_info = user_info;
          self.dispatch({type: 'LOGIN', payload: {
              user,
              isAuthenticated: true
          }})
      });
      } else {
        self.dispatch({type: 'LOGOUT', payload: {
          user: null,
          isAuthenticated: false
      }})
      }
    });
  }

  render() {
    return (
      <div className="App">
          <Main/>
      </div>
    );
  }
}
