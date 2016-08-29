import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import LoginView from './login.view';
//import { authenticate } from '../../actions/login-action';

class LoginContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName:"",
            password:""
        }
        this.login = this.login.bind(this);
        this.handleUserNameChange = this.handleUserNameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    login() {
        localStorage.setItem('userInfo', this.state.userName);
        location.href = "/home";
        //this.props.authenticate(this.state.userName,this.state.password);
    }
    handleUserNameChange(e) {
        this.setState({userName:e.target.value});
    }
    handlePasswordChange(e) {
        this.setState({password:e.target.value});
    }
    render() {
        return (
            <div>
                <LoginView
                    login={this.login}
                    handleUserNameChange={this.handleUserNameChange}
                    handlePasswordChange={this.handlePasswordChange}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        // authenticate: (username,password) => {
        //     dispatch(authenticate(username,password));
        // }
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginContainer);