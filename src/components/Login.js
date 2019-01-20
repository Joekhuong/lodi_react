import React, { Component } from "react";
import { AppContext } from "../AppContext";
import firebase from "../Firebase";

class LoginDump extends Component {
  constructor(props) {
    super(props);
    this.context_state = props.context_state;
    this.dispatch = props.dispatch;
  }

  state = {
    email: "",
    password: ""
  };

  handleOnChange = e => {
    e.preventDefault(e);
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleOnSubmit = e => {
    e.preventDefault();
    let self = this;

    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(function(res) {
        let user = res.user;
        if (user) {
          firebase
            .firestore()
            .collection("users")
            .doc(user.uid)
            .get()
            .then(function(doc) {
              let user_info = doc.data();
              user.user_info = user_info;
              self.dispatch({
                type: "LOGIN",
                payload: {
                  user,
                  isAuthenticated: true
                }
              });
              self.props.history.push("/");
            });
        } else {
          self.dispatch({
            type: "LOGOUT",
            payload: {
              user: null,
              isAuthenticated: false
            }
          });
        }
      })
      .catch(function(error) {
        alert(error.message);
      });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card card-signin my-5 bg-secondary text-white">
              <div className="card-body">
                <h5 className="card-title text-center">Sign In</h5>
                <form
                  className="form-signin"
                  onSubmit={this.handleOnSubmit}
                  onChange={this.handleOnChange}
                >
                  <div className="form-label-group">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="form-control"
                      placeholder="Email address"
                      required
                      autoFocus
                    />
                  </div>

                  <div className="form-label-group">
                    <input
                      type="password"
                      name="password"
                      id="password"
                      className="form-control"
                      placeholder="Password"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-lg btn-primary btn-block text-uppercase"
                  >
                    Sign in
                  </button>
                  <a
                    href="/register"
                    className="btn btn-lg btn-dark btn-block text-uppercase"
                  >
                    Register
                  </a>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default props => {
  let { state, dispatch } = React.useContext(AppContext);

  return <LoginDump {...props} context_state={state} dispatch={dispatch} />;
};
