import React, { Component } from "react";
import { AppContext } from "../AppContext";
import firebase from "../Firebase";

class LoginDump extends Component {
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

    if (this.state.region == -1) {
      alert("Please select region!");
      return;
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(function(res) {
        let user = res.user;
        let user_info = {
          firstname: self.state.firstname,
          lastname: self.state.lastname,
          region: self.state.region
        };
        user.user_info = user_info;

        firebase
          .firestore()
          .collection("users")
          .doc(user.uid)
          .set(user_info)
          .then(function() {
            self.dispatch({
              type: "LOGIN",
              payload: {
                user,
                isAuthenticated: true
              }
            });
            self.props.history.push("/");
          });
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
            <div className="card card-signin my-5">
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
                      id="inputEmail"
                      className="form-control"
                      placeholder="Email address"
                      required
                      autofocus
                    />
                  </div>

                  <div className="form-label-group">
                    <input
                      type="password"
                      id="inputPassword"
                      className="form-control"
                      placeholder="Password"
                      required
                    />
                  </div>
                  <a
                    href="#!"
                    className="btn btn-lg btn-primary btn-block text-uppercase"
                  >
                    Sign in
                  </a>
                  <a
                    href="#!"
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
