import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
//import Highcharts from 'highcharts';
import Highcharts from 'highcharts/highstock';

// Apply the theme
//Highcharts.setOptions(Highcharts.theme);
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

    componentWillReceiveProps(newProps) {
       this.chart = new Highcharts[this.props.type || "Chart"](
            this.props.container,
            newProps.options
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