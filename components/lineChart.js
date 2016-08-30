import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Chart from './chart';
import * as _ from 'lodash';
import { getChartData } from '../actions/chart-action';

class LineChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            optionsBar: {}
        }
    }
    componentDidMount() {
        this.props.getChartData("lineZoom");
        this.props.getChartData("lineMultiple");
        this.props.getChartData("lineSpline");
        this.props.getChartData("lineSplineSymbol");
        this.props.getChartData("lineLogarithmic");
        this.setState({
            optionsLineZoom: {
                chart: {
                    renderTo: 'container',
                    type: 'spline',
                    zoomType: 'x'
                },
                plotOptions: {
                    line: {
                        dataLabels: {
                            enabled: true
                        }
                    }
                },
                title: {
                    text: 'Zoomable Line Graph'
                },
                subtitle: {
                    text: 'last 12 months'
                },
                xAxis: {
                    categories: [
                        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
                    ]
                },
                yAxis: {
                    title: {
                        text: 'Profit %'
                    }
                },
                series: []
            },
            optionsLineMultiple: {
                title: {
                    text: 'Basic Line Graph',
                    x: -20 //center
                },
                subtitle: {
                    text: 'Source: WorldClimate.com',
                    x: -20
                },
                xAxis: {
                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                },
                yAxis: {
                    title: {
                        text: 'Temperature (°C)'
                    },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }]
                },
                tooltip: {
                    valueSuffix: '°C'
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle',
                    borderWidth: 0
                },
                series: []
            },
            optionsSpline: {
                chart: {
                    type: 'spline',
                    inverted: true
                },
                title: {
                    text: 'Spline with inverted axis'
                },
                subtitle: {
                    text: 'According to the Standard Atmosphere Model'
                },
                xAxis: {
                    reversed: false,
                    title: {
                        enabled: true,
                        text: 'Altitude'
                    },
                    labels: {
                        formatter: function () {
                            return this.value + 'km';
                        }
                    },
                    maxPadding: 0.05,
                    showLastLabel: true
                },
                yAxis: {
                    title: {
                        text: 'Temperature'
                    },
                    labels: {
                        formatter: function () {
                            return this.value + '°';
                        }
                    },
                    lineWidth: 2
                },
                legend: {
                    enabled: false
                },
                tooltip: {
                    headerFormat: '<b>{series.name}</b><br/>',
                    pointFormat: '{point.x} km: {point.y}°C'
                },
                plotOptions: {
                    spline: {
                        marker: {
                            enable: false
                        }
                    }
                },
                series: []
            },
            optionsSplineSymbol: {
                chart: {
                    type: 'spline'
                },
                title: {
                    text: 'Spline with symbol'
                },
                subtitle: {
                    text: 'Source: WorldClimate.com'
                },
                xAxis: {
                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                },
                yAxis: {
                    title: {
                        text: 'Temperature'
                    },
                    labels: {
                        formatter: function () {
                            return this.value + '°';
                        }
                    }
                },
                tooltip: {
                    crosshairs: true,
                    shared: true
                },
                plotOptions: {
                    spline: {
                        marker: {
                            radius: 4,
                            lineColor: '#666666',
                            lineWidth: 1
                        }
                    }
                },
                series: []
            },
            optionsLogarithmic: {
                title: {
                    text: 'Logarithmic axis demo'
                },

                xAxis: {
                    tickInterval: 1
                },

                yAxis: {
                    type: 'logarithmic',
                    minorTickInterval: 0.1
                },

                tooltip: {
                    headerFormat: '<b>{series.name}</b><br />',
                    pointFormat: 'x = {point.x}, y = {point.y}'
                },

                series: []
            }
        });
    }

    componentWillReceiveProps(newProps) {
        let optionsLineZoom = this.state.optionsLineZoom;
        optionsLineZoom.series = newProps.lineZoom;
        let optionsLineMultiple = this.state.optionsLineMultiple;
        optionsLineMultiple.series = newProps.lineMultiple;
        let optionsSpline = this.state.optionsSpline;
        optionsSpline.series = newProps.lineSpline;
        let optionsSplineSymbol = this.state.optionsSplineSymbol;
        optionsSplineSymbol.series = newProps.lineSplineSymbol;
        let optionsLogarithmic = this.state.optionsLogarithmic;
        optionsLogarithmic.series = newProps.lineLogarithmic;
        this.setState({
            optionsLineZoom: optionsLineZoom, optionsLineMultiple: optionsLineMultiple,
            optionsSpline: optionsSpline, optionsSplineSymbol: optionsSplineSymbol, optionsLogarithmic: optionsLogarithmic
        });
    }
    render() {
        if (!_.isEmpty(this.state.optionsLineZoom)) {
            return (
                <div>
                    <div className="row">
                        <div className="col-lg-12">
                            <h1 className="page-header">Line Chart</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <Chart container="optionsLineMultiple" options={this.state.optionsLineMultiple}/>
                        </div>
                        <div className="col-md-6">
                            <Chart container="optionsLineZoom" options={this.state.optionsLineZoom}/>
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-md-6">
                            <Chart container="optionsSpline" options={this.state.optionsSpline}/>
                        </div>
                        <div className="col-md-6">
                            <Chart container="optionsSplineSymbol" options={this.state.optionsSplineSymbol}/>
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-md-6">
                            <Chart container="optionsLogarithmic" options={this.state.optionsLogarithmic}/>
                        </div>
                        <div className="col-md-6">
                        </div>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div></div>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        lineZoom: state.lineZoom,
        lineMultiple: state.lineMultiple,
        lineSpline: state.lineSpline,
        lineSplineSymbol: state.lineSplineSymbol,
        lineLogarithmic: state.lineLogarithmic,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getChartData: (chartName) => {
            dispatch(getChartData({ chartName: chartName }));
        }
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LineChart);