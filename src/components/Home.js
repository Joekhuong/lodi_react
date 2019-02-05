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
    var idol_management_btn = "";

    if (this.state.context_state.user.user_info.roles.includes("admin")) {
      idol_management_btn = (
        <button type="button" className="btn btn-primary m-1 text-uppercase">
          Idol Management
        </button>
      );
    }

    return (
      <div className="bg-white">
        <nav class="navbar navbar-light bg-dark text-white d-flex">
          <a href="#!" class="navbar-brand text-white">
            LODI
          </a>
          <form class="form-inline">
            <div class="input-group">
              <input
                type="text"
                class="form-control"
                aria-label="Recipient's username"
                aria-describedby="button-addon2"
              />
              <div class="input-group-append">
                <button class="btn" type="button" id="button-addon2">
                  <i class="fa fa-search" />
                </button>
              </div>
            </div>
          </form>
          <div class="d-inline-flex">

            {idol_management_btn}

            <button
              type="button"
              className="btn btn-danger m-1 text-uppercase"
              onClick={this.handleSignout}
            >
              Signout
            </button>
          </div>
        </nav>
        <div class="container-fluid gedf-wrapper">
          <div class="row">
            {/* Left side */}
            <div class="col-md-3 mt-1">
              <div class="card">
                <div class="card-body">
                  <div class="h5">
                    @
                    {this.state.context_state.user.user_info.firstname +
                      " " +
                      this.state.context_state.user.user_info.lastname}
                  </div>
                  <div class="h7 text-muted">
                    Region :{" "}
                    {this.state.context_state.user.user_info.region.name}
                  </div>
                </div>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">
                    <div class="h6 text-muted">Your idols</div>
                    <table class="table table-bordered">
                      <tbody>
                        <tr>
                          <td>John</td>
                          <td>Doe</td>
                          <td>john@example.com</td>
                        </tr>
                        <tr>
                          <td>Mary</td>
                          <td>Moe</td>
                          <td>mary@example.com</td>
                        </tr>
                        <tr>
                          <td>July</td>
                          <td>Dooley</td>
                          <td>july@example.com</td>
                        </tr>
                      </tbody>
                    </table>
                  </li>
                  <li class="list-group-item">Vestibulum at eros</li>
                </ul>
              </div>
            </div>

            {/* Center */}
            <div class="col-md-6 gedf-main mt-1">
              <div class="card gedf-card">
                <div class="card-header">
                  <ul
                    class="nav nav-tabs card-header-tabs"
                    id="myTab"
                    role="tablist"
                  >
                    <li class="nav-item">
                      <a
                        class="nav-link active"
                        id="posts-tab"
                        data-toggle="tab"
                        href="#posts"
                        role="tab"
                        aria-controls="posts"
                        aria-selected="true"
                      >
                        Make a publication
                      </a>
                    </li>
                    <li class="nav-item">
                      <a
                        class="nav-link"
                        id="images-tab"
                        data-toggle="tab"
                        role="tab"
                        aria-controls="images"
                        aria-selected="false"
                        href="#images"
                      >
                        Images
                      </a>
                    </li>
                  </ul>
                </div>
                <div class="card-body">
                  <div class="tab-content" id="myTabContent">
                    <div
                      class="tab-pane fade show active"
                      id="posts"
                      role="tabpanel"
                      aria-labelledby="posts-tab"
                    >
                      <div class="form-group">
                        <label class="sr-only" for="message">
                          post
                        </label>
                        <textarea
                          class="form-control"
                          id="message"
                          rows="3"
                          placeholder="What are you thinking?"
                        />
                      </div>
                    </div>
                    <div
                      class="tab-pane fade"
                      id="images"
                      role="tabpanel"
                      aria-labelledby="images-tab"
                    >
                      <div class="form-group">
                        <div class="custom-file">
                          <input
                            type="file"
                            class="custom-file-input"
                            id="customFile"
                          />

                          <label class="custom-file-label" for="customFile">
                            Upload image
                          </label>
                        </div>
                      </div>
                      <div class="py-4" />
                    </div>
                  </div>
                  <div class="btn-toolbar justify-content-between">
                    <div class="btn-group">
                      <button type="submit" class="btn btn-primary">
                        share
                      </button>
                    </div>
                    <div class="btn-group">
                      <button
                        id="btnGroupDrop1"
                        type="button"
                        class="btn btn-link dropdown-toggle"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <i class="fa fa-globe" />
                      </button>
                      <div
                        class="dropdown-menu dropdown-menu-right"
                        aria-labelledby="btnGroupDrop1"
                      >
                        <a class="dropdown-item" href="#!">
                          <i class="fa fa-globe" /> Public
                        </a>
                        <a class="dropdown-item" href="#!">
                          <i class="fa fa-users" /> Friends
                        </a>
                        <a class="dropdown-item" href="#!">
                          <i class="fa fa-user" /> Just me
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right */}
            <div class="col-md-3 mt-1">
              <div class="card gedf-card">
                <div class="card-body">
                  <h5 class="card-title">Card title</h5>
                  <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
                  <p class="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                  <a href="#!" class="card-link">
                    Card link
                  </a>
                  <a href="#!" class="card-link">
                    Another link
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
