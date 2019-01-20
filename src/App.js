import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Main from "./Main";
import firebase from "./Firebase";
import { AppContext } from "./AppContext";

export default props => {
  // [A]
  let { state, dispatch } = React.useContext(AppContext);

  //
  return <AppDump {...props} context_state={state} dispatch={dispatch} />;
};

class AppDump extends Component {
  state = {
    context_state: this.props.context_state,
    dispatch: this.props.dispatch
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.context_state.listen_to_auth == true) {
      var unsubscribe = firebase.auth().onAuthStateChanged(function(user) {
        console.log("onAuthStateChanged");
        unsubscribe();
        console.log("abc");

        if (user) {
          firebase
            .firestore()
            .collection("users")
            .doc(user.uid)
            .get()
            .then(function(doc) {
              let user_info = doc.data();
              user.user_info = user_info;
              console.log("Login");
              prevState.dispatch({
                type: "LOGIN",
                payload: {
                  user,
                  isAuthenticated: true,
                  isLoading: false,
                  listen_to_auth: false
                }
              });
            });
        } else {
          console.log("Logout");
          prevState.dispatch({
            type: "LOGOUT",
            payload: {
              user: null,
              isAuthenticated: false,
              isLoading: false,
              listen_to_auth: false
            }
          });
        }
      });
    }

    return { context_state: nextProps.context_state };
  }
  
  render() {
    console.log(this.state.context_state);
    return this.state.context_state.isLoading == true ? (
      "...Loading..."
    ) : (
      <div className="App">
        <Main />
      </div>
    );
  }
}
