import React, { Component } from "react";
import firebase from "../Firebase";
import { AppContext } from "../AppContext";

class RegisterDump extends Component {
  constructor(props) {
    super(props);
    this.context_state = props.context_state;
    this.dispatch = props.dispatch;
  }

  state = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    region: -1,
    regions: {}
  };

  componentWillMount = () => {
    let self = this;
    firebase
      .firestore()
      .collection("regions")
      .get()
      .then(querySnapshot => {
        let regions = {};
        querySnapshot.forEach((doc, key) => {
          let data = doc.data();
          regions = {...regions,[doc.id]:data.name};
        });
        self.setState({ regions });
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
          region: {
              id: self.state.region,
              name: self.state.regions[self.state.region]
          }
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

  handleOnChange = e => {
    e.preventDefault(e);
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card card-signin my-5">
              <div className="card-body">
                <h5 className="card-title text-center">Register</h5>
                <form
                  className="form-signin"
                  onSubmit={this.handleOnSubmit}
                  onChange={this.handleOnChange}
                >
                  <div className="form-label-group">
                    <label htmlFor="firstname">Firstname</label>
                    <input
                      type="text"
                      id="firstname"
                      name="firstname"
                      className="form-control"
                      placeholder="Firstname"
                      required
                    />
                  </div>
                  <div className="form-label-group">
                    <label htmlFor="lastname">Password</label>
                    <input
                      type="text"
                      id="lastname"
                      name="lastname"
                      className="form-control"
                      placeholder="Lastname"
                      required
                    />
                  </div>
                  <div className="form-label-group">
                    <label htmlFor="email">Emaill</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-control"
                      placeholder="Email address"
                      required
                      autoFocus
                    />
                  </div>
                  <div className="form-label-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="form-control"
                      placeholder="Password"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="region">Region</label>
                    <select
                      className="form-control"
                      id="region"
                      name="region"
                      required
                    >
                      <option value="">--Select Region--</option>
                      {
                          
                        // this.state.regions.map(item => (
                        //     <option key={item.id} value={item.id}>
                        //     {item.name}
                        //     </option>
                        // ))
                        
                        Object.keys(this.state.regions).map(key => 
                            <option key={key} value={key}>{this.state.regions[key]}</option>
                        )
                      }
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-lg btn-primary btn-block text-uppercase"
                  >
                    Register
                  </button>
                  <a
                    href="login"
                    className="btn btn-lg btn-dark btn-block text-uppercase"
                  >
                    SIGN IN
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

  return <RegisterDump {...props} context_state={state} dispatch={dispatch} />;
};
