import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Chart from './chart';
import * as _ from 'lodash';
import Highcharts from 'highcharts';
import Highcharts3D from  'highcharts/highcharts-3d';


class DynamicChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentDidMount() {
        this.setState({
            optionsSpline: {
                chart: {
                    type: 'spline',
                    animation: Highcharts.svg, // don't animate in old IE
                    marginRight: 10,
                    events: {
                        load: function () {

                            // set up the updating of the chart each second
                            var series = this.series[0];
                            setInterval(function () {
                                var x = (new Date()).getTime(), // current time
                                    y = Math.random();
                                series.addPoint([x, y], true, true);
                            }, 1000);
                        }
                    }
                },
                title: {
                    text: 'Live random data'
                },
                xAxis: {
                    type: 'datetime',
                    tickPixelInterval: 150
                },
                yAxis: {
                    title: {
                        text: 'Value'
                    },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }]
                },
                tooltip: {
                    formatter: function () {
                        return '<b>' + this.series.name + '</b><br/>' +
                            Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                            Highcharts.numberFormat(this.y, 2);
                    }
                },
                legend: {
                    enabled: false
                },
                exporting: {
                    enabled: false
                },
                series: [{
                    name: 'Random data',
                    data: (function () {
                        // generate an array of random data
                        var data = [],
                            time = (new Date()).getTime(),
                            i;

                        for (i = -19; i <= 0; i += 1) {
                            data.push({
                                x: time + i * 1000,
                                y: Math.random()
                            });
                        }
                        return data;
                    } ())
                }]
            },
            optionsAddPoints: {
                chart: {
                    type: 'scatter',
                    margin: [70, 50, 60, 80],
                    events: {
                        click: function (e) {
                            // find the clicked values and the series
                            var x = e.xAxis[0].value,
                                y = e.yAxis[0].value,
                                series = this.series[0];

                            // Add it
                            series.addPoint([x, y]);

                        }
                    }
                },
                title: {
                    text: 'User supplied data'
                },
                subtitle: {
                    text: 'Click the plot area to add a point. Click a point to remove it.'
                },
                xAxis: {
                    gridLineWidth: 1,
                    minPadding: 0.2,
                    maxPadding: 0.2,
                    maxZoom: 60
                },
                yAxis: {
                    title: {
                        text: 'Value'
                    },
                    minPadding: 0.2,
                    maxPadding: 0.2,
                    maxZoom: 60,
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }]
                },
                legend: {
                    enabled: false
                },
                exporting: {
                    enabled: false
                },
                plotOptions: {
                    series: {
                        lineWidth: 1,
                        point: {
                            events: {
                                'click': function () {
                                    if (this.series.data.length > 1) {
                                        this.remove();
                                    }
                                }
                            }
                        }
                    }
                },
                series: [{
                    data: [[20, 20], [80, 80]]
                }]
            },
            options3dColumn: {
                chart: {
                    type: 'column',
                    options3d: {
                        enabled: true,
                        alpha: 10,
                        beta: 25,
                        depth: 70
                    }
                },
                title: {
                    text: '3D chart with null values'
                },
                subtitle: {
                    text: 'Notice the difference between a 0 value and a null point'
                },
                plotOptions: {
                    column: {
                        depth: 25
                    }
                },
                xAxis: {
                    categories: Highcharts.getOptions().lang.shortMonths
                },
                yAxis: {
                    title: {
                        text: null
                    }
                },
                series: [{
                    name: 'Sales',
                    data: [2, 3, null, 4, 0, 5, 1, 4, 6, 3]
                }]
            },
            options3dColumnStack: {
                chart: {
                    type: 'column',
                    options3d: {
                        enabled: true,
                        alpha: 15,
                        beta: 15,
                        viewDistance: 25,
                        depth: 40
                    }
                },

                title: {
                    text: 'Total fruit consumption, grouped by gender'
                },

                xAxis: {
                    categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
                },

                yAxis: {
                    allowDecimals: false,
                    min: 0,
                    title: {
                        text: 'Number of fruits'
                    }
                },

                tooltip: {
                    headerFormat: '<b>{point.key}</b><br>',
                    pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: {point.y} / {point.stackTotal}'
                },

                plotOptions: {
                    column: {
                        stacking: 'normal',
                        depth: 40
                    }
                },

                series: [{
                    name: 'John',
                    data: [5, 3, 4, 7, 2],
                    stack: 'male'
                }, {
                        name: 'Joe',
                        data: [3, 4, 4, 2, 5],
                        stack: 'male'
                    }, {
                        name: 'Jane',
                        data: [2, 5, 6, 2, 1],
                        stack: 'female'
                    }, {
                        name: 'Janet',
                        data: [3, 0, 4, 4, 3],
                        stack: 'female'
                    }]
            },
            options3dPie: {
                chart: {
                    type: 'pie',
                    options3d: {
                        enabled: true,
                        alpha: 45,
                        beta: 0
                    }
                },
                title: {
                    text: '3D Pie Chart'
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        depth: 35,
                        dataLabels: {
                            enabled: true,
                            format: '{point.name}'
                        }
                    }
                },
                series: [{
                    type: 'pie',
                    name: 'Browser share',
                    data: [
                        ['Firefox', 45.0],
                        ['IE', 26.8],
                        {
                            name: 'Chrome',
                            y: 12.8,
                            sliced: true,
                            selected: true
                        },
                        ['Safari', 8.5],
                        ['Opera', 6.2],
                        ['Others', 0.7]
                    ]
                }]
            },
            options3dDonut: {
                chart: {
                    type: 'pie',
                    options3d: {
                        enabled: true,
                        alpha: 45
                    }
                },
                title: {
                    text: 'Contents of Highsoft\'s weekly fruit delivery'
                },
                subtitle: {
                    text: '3D donut in Highcharts'
                },
                plotOptions: {
                    pie: {
                        innerSize: 100,
                        depth: 45
                    }
                },
                series: [{
                    name: 'Delivered amount',
                    data: [
                        ['Bananas', 8],
                        ['Kiwi', 3],
                        ['Mixed nuts', 1],
                        ['Oranges', 6],
                        ['Apples', 8],
                        ['Pears', 4],
                        ['Clementines', 4],
                        ['Reddish (bag)', 1],
                        ['Grapes (bunch)', 1]
                    ]
                }]
            },

        });
    }

    render() {
        if (!_.isEmpty(this.state.optionsSpline)) {
            return (
                <div>
                    <div className="row">
                        <div className="col-md-6">
                            <Chart container="optionsSpline" options={this.state.optionsSpline}/>
                        </div>
                        <div className="col-md-6">
                            <Chart container="optionsAddPoints" options={this.state.optionsAddPoints}/>
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-md-6">
                            <Chart container="options3dColumn" options={this.state.options3dColumn} modules={[Highcharts3D]} />
                        </div>
                        <div className="col-md-6">
                            <Chart container="options3dColumnStack" options={this.state.options3dColumnStack} modules={[Highcharts3D]} />
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-md-6">
                            <Chart container="options3dPie" options={this.state.options3dPie} modules={[Highcharts3D]} />
                        </div>
                        <div className="col-md-6">
                            <Chart container="options3dDonut" options={this.state.options3dDonut} modules={[Highcharts3D]} />
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

export default DynamicChart;