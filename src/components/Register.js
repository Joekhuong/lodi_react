import React, { Component } from 'react'

export class Register extends Component {
  render() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                    <div className="card card-signin my-5">
                        <div className="card-body">
                            <h5 className="card-title text-center">Register</h5>
                            <form className="form-signin">
                                <div className="form-label-group">
                                    <input type="text" id="inputPassword" className="form-control" placeholder="Firstname" required/>                                    
                                </div>
                                <div className="form-label-group">
                                    <input type="text" id="inputPassword" className="form-control" placeholder="Lastname" required/>                                    
                                </div>
                                <div className="form-label-group">
                                    <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autofocus/>                                    
                                </div>
                                <div className="form-label-group">
                                    <input type="password" id="inputPassword" className="form-control" placeholder="Password" required/>                                    
                                </div>
                                <a href="#!" className="btn btn-lg btn-primary btn-block text-uppercase">Sign in</a>
                                <a href="#!" className="btn btn-lg btn-dark btn-block text-uppercase">Register</a>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
  }
}

export default Register
