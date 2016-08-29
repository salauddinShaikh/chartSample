import React, { Component, PropTypes } from 'react';
import HeaderView from './header.view';

class HeaderContainer extends Component {
    constructor(props) {
        super(props);
    }

    logout(){
        localStorage.removeItem("userInfo");
        location.href="/login";
    }
    render() {
        return (
            <div>
                <HeaderView
                logout={this.logout} />
            </div>
        )
    }
}

export default HeaderContainer