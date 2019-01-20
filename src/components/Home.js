import React, { Component } from "react";
import { AppContext } from "../AppContext";
import firebase from "../Firebase";

export default props => {
  let { state, dispatch } = React.useContext(AppContext);

  return <HomeDump {...props} context_state={state} dispatch={dispatch} />;
};

class HomeDump extends Component {
  state = {
    context_state: this.props.context_state,
    dispatch: this.props.dispatch
  };

  handleSignout = e => {
    e.preventDefault();
    firebase.auth().signOut();
    console.log("Logout");
    this.state.dispatch({
      type: "LOGOUT",
      payload: {
        user: null,
        isAuthenticated: false,
        listen_to_auth: false
      }
    });
  };

  render() {
    console.log(this.props.context_state);
    return (
      <div>
        This is Home <br />
        <button
          type="button"
          className="btn btn-lg btn-dark text-uppercase"
          onClick={this.handleSignout}
        >
          Signout
        </button>
      </div>
    );
  }
}
