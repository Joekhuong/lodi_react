import React, { Component } from 'react'
import {AppContext} from '../AppContext';
import firebase from '../Firebase';

export default (props) => {

  let { state,dispatch } = React.useContext(AppContext);

  return (
    <HomeDump {...props} context_state={state} dispatch={dispatch}/>
  )

}

class HomeDump extends Component {

  handleSignout = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
  }

  render() {
    return (
      <div>
        This is Home <br/>
        <button type="button" className="btn btn-lg btn-dark text-uppercase" onClick={this.handleSignout}>Signout</button>
      </div>
    )
  }
}