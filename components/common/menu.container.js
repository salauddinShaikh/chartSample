import React, { Component, PropTypes } from 'react';
import MenuView from './menu.view';

class MenuContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <MenuView />
            </div>
        )
    }
}

export default MenuContainer