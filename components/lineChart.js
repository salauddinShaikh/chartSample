import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Chart from './chart';
import * as _ from 'lodash';

class LineChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            optionsBar: {}
        }
    }
    componentDidMount() {
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
                series: [{
                    name: 'Chairs',
                    data: [
                        -10, -6, -1, 2, 5, 7, 9, 12, 8, 6, 10, 7
                    ]
                }, {
                        name: 'Tables',
                        data: [
                            4, 2, 7, 9, 11, 13, 20, 14, 8, 9, 13, 19
                        ]
                    }
                ]
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
                series: [{
                    name: 'Tokyo',
                    data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
                }, {
                        name: 'New York',
                        data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
                    }, {
                        name: 'Berlin',
                        data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
                    }, {
                        name: 'London',
                        data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
                    }]
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
                series: [{
                    name: 'Temperature',
                    data: [[0, 15], [10, -50], [20, -56.5], [30, -46.5], [40, -22.1],
                        [50, -2.5], [60, -27.7], [70, -55.7], [80, -76.5]]
                }]
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
                series: [{
                    name: 'Tokyo',
                    marker: {
                        symbol: 'square'
                    },
                    data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, {
                        y: 26.5,
                        marker: {
                            symbol: 'url(https://www.highcharts.com/samples/graphics/sun.png)'
                        }
                    }, 23.3, 18.3, 13.9, 9.6]

                }, {
                        name: 'London',
                        marker: {
                            symbol: 'diamond'
                        },
                        data: [{
                            y: 3.9,
                            marker: {
                                symbol: 'url(https://www.highcharts.com/samples/graphics/snow.png)'
                            }
                        }, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
                    }]
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

                series: [{
                    data: [1, 2, 4, 8, 16, 32, 64, 128, 256, 512],
                    pointStart: 1
                }]
            }


        });
    }

    render() {
        if (!_.isEmpty(this.state.optionsLineZoom)) {
            return (
                <div>
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

export default LineChart;