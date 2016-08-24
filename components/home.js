import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    render() {
        return (
            <div>
               <h1> Hello From React </h1>
            </div>
        );
    }
}

export default Home;