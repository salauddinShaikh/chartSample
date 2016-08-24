import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Highcharts from 'highcharts';

class Chart extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // Extend Highcharts with modules
        if (this.props.modules) {
            this.props.modules.forEach(function (module) {
                module(Highcharts);
            });
        }
        this.chart = new Highcharts[this.props.type || "Chart"](
            this.props.container,
            this.props.options
        );
    }

    componentWillUnmount() {
        this.chart.destroy();
    }

    render() {
        return React.createElement('div', {
            id: this.props.container
        });
    }
}

export default Chart;