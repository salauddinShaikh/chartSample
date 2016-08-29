import React, { Component, PropTypes } from 'react';

class LoginView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-4 col-md-offset-4">
                        <div className="login-panel panel panel-default">
                            <div className="panel-heading">
                                <h3 className="panel-title">Please Sign In</h3>
                            </div>
                            <div className="panel-body">
                                <form >
                                    <fieldset>
                                        <div className="form-group">
                                            <input className="form-control" onChange={this.props.handleUserNameChange} placeholder="User Name" name="email" type="text" autofocus />
                                        </div>
                                        <div className="form-group">
                                            <input className="form-control" onChange={this.props.handlePasswordChange}  placeholder="Password" name="password" type="password" />
                                        </div>
                                        <div className="checkbox">
                                            <label>
                                                <input name="remember" type="checkbox" value="Remember Me" />Remember Me
                                            </label>
                                        </div>
                                        <a className="btn btn-lg btn-success btn-block" onClick={this.props.login}>Login</a>
                                    </fieldset>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

LoginView.propTypes = {
};

export default LoginView