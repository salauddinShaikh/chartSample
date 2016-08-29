import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Chart from './chart';
import * as _ from 'lodash';
import Highcharts from 'highcharts';
import Data from 'highcharts/modules/data';
import Drilldown from 'highcharts/modules/drilldown';

const categories = ['0-4', '5-9', '10-14', '15-19',
    '20-24', '25-29', '30-34', '35-39', '40-44',
    '45-49', '50-54', '55-59', '60-64', '65-69',
    '70-74', '75-79', '80-84', '85-89', '90-94',
    '95-99', '100 + '];
class BarChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            optionsBar: {}
        }
    }
    componentDidMount() {
        this.setState({
            optionsBarBasic: {
                chart: {
                    type: 'bar'
                },
                title: {
                    text: 'Basic Bar graph'
                },
                subtitle: {
                    text: 'Source: <a href="https://en.wikipedia.org/wiki/World_population">Wikipedia.org</a>'
                },
                xAxis: {
                    categories: ['Africa', 'America', 'Asia', 'Europe', 'Oceania'],
                    title: {
                        text: null
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Population (millions)',
                        align: 'high'
                    },
                    labels: {
                        overflow: 'justify'
                    }
                },
                tooltip: {
                    valueSuffix: ' millions'
                },
                plotOptions: {
                    bar: {
                        dataLabels: {
                            enabled: true
                        }
                    }
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'top',
                    x: -40,
                    y: 80,
                    floating: true,
                    borderWidth: 1,
                    backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
                    shadow: true
                },
                credits: {
                    enabled: false
                },
                series: [{
                    name: 'Year 1800',
                    data: [107, 31, 635, 203, 2]
                }, {
                        name: 'Year 1900',
                        data: [133, 156, 947, 408, 6]
                    }, {
                        name: 'Year 2012',
                        data: [1052, 954, 4250, 740, 38]
                    }]
            },
            optionsBarStack: {
                chart: {
                    type: 'bar'
                },
                title: {
                    text: 'Stacked bar chart'
                },
                xAxis: {
                    categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Total fruit consumption'
                    }
                },
                legend: {
                    reversed: true
                },
                plotOptions: {
                    series: {
                        stacking: 'normal'
                    }
                },
                series: [{
                    name: 'John',
                    data: [5, 3, 4, 7, 2]
                }, {
                        name: 'Jane',
                        data: [2, 2, 3, 2, 1]
                    }, {
                        name: 'Joe',
                        data: [3, 4, 4, 2, 5]
                    }]
            },
            optionsBarNegativeStack: {
                chart: {
                    type: 'bar'
                },
                title: {
                    text: 'Negative Stack Bar chart'
                },
                subtitle: {
                    text: 'Source: <a href="http://populationpyramid.net/germany/2015/">Population Pyramids of the World from 1950 to 2100</a>'
                },
                xAxis: [{
                    categories: categories,
                    reversed: false,
                    labels: {
                        step: 1
                    }
                }, { // mirror axis on right side
                        opposite: true,
                        reversed: false,
                        categories: categories,
                        linkedTo: 0,
                        labels: {
                            step: 1
                        }
                    }],
                yAxis: {
                    title: {
                        text: null
                    },
                    labels: {
                        formatter: function () {
                            return Math.abs(this.value) + '%';
                        }
                    }
                },

                plotOptions: {
                    series: {
                        stacking: 'normal'
                    }
                },

                tooltip: {
                    formatter: function () {
                        return '<b>' + this.series.name + ', age ' + this.point.category + '</b><br/>' +
                            'Population: ' + Highcharts.numberFormat(Math.abs(this.point.y), 0);
                    }
                },

                series: [{
                    name: 'Male',
                    data: [-2.2, -2.2, -2.3, -2.5, -2.7, -3.1, -3.2,
                        -3.0, -3.2, -4.3, -4.4, -3.6, -3.1, -2.4,
                        -2.5, -2.3, -1.2, -0.6, -0.2, -0.0, -0.0]
                }, {
                        name: 'Female',
                        data: [2.1, 2.0, 2.2, 2.4, 2.6, 3.0, 3.1, 2.9,
                            3.1, 4.1, 4.3, 3.6, 3.4, 2.6, 2.9, 2.9,
                            1.8, 1.2, 0.6, 0.1, 0.0]
                    }]
            },
            optionsColumnBasic: {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Basic Column chart'
                },
                subtitle: {
                    text: 'Source: WorldClimate.com'
                },
                xAxis: {
                    categories: [
                        'Jan',
                        'Feb',
                        'Mar',
                        'Apr',
                        'May',
                        'Jun',
                        'Jul',
                        'Aug',
                        'Sep',
                        'Oct',
                        'Nov',
                        'Dec'
                    ],
                    crosshair: true
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Rainfall (mm)'
                    }
                },
                tooltip: {
                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0
                    }
                },
                series: [{
                    name: 'Tokyo',
                    data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]

                }, {
                        name: 'New York',
                        data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]

                    }, {
                        name: 'London',
                        data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]

                    }, {
                        name: 'Berlin',
                        data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]

                    }]
            },
            optionsColumnNegative: {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Column chart with negative values'
                },
                xAxis: {
                    categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
                },
                credits: {
                    enabled: false
                },
                series: [{
                    name: 'John',
                    data: [5, 3, 4, 7, 2]
                }, {
                        name: 'Jane',
                        data: [2, -2, -3, 2, 1]
                    }, {
                        name: 'Joe',
                        data: [3, 4, 4, -2, 5]
                    }]
            },
            optionsColumnStack: {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Stacked column chart'
                },
                xAxis: {
                    categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Total fruit consumption'
                    },
                    stackLabels: {
                        enabled: true,
                        style: {
                            fontWeight: 'bold',
                            color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                        }
                    }
                },
                legend: {
                    align: 'right',
                    x: -30,
                    verticalAlign: 'top',
                    y: 25,
                    floating: true,
                    backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
                    borderColor: '#CCC',
                    borderWidth: 1,
                    shadow: false
                },
                tooltip: {
                    headerFormat: '<b>{point.x}</b><br/>',
                    pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
                },
                plotOptions: {
                    column: {
                        stacking: 'normal',
                        dataLabels: {
                            enabled: true,
                            color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                            style: {
                                textShadow: '0 0 3px black'
                            }
                        }
                    }
                },
                series: [{
                    name: 'John',
                    data: [5, 3, 4, 7, 2]
                }, {
                        name: 'Jane',
                        data: [2, 2, 3, 2, 1]
                    }, {
                        name: 'Joe',
                        data: [3, 4, 4, 2, 5]
                    }]
            },
            optionsColumnStackGroup: {
                chart: {
                    type: 'column'
                },

                title: {
                    text: 'Column stack and group'
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
                    formatter: function () {
                        return '<b>' + this.x + '</b><br/>' +
                            this.series.name + ': ' + this.y + '<br/>' +
                            'Total: ' + this.point.stackTotal;
                    }
                },

                plotOptions: {
                    column: {
                        stacking: 'normal'
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
            optionsColumnStackPercentage: {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Column stack and percentage'
                },
                xAxis: {
                    categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Total fruit consumption'
                    }
                },
                tooltip: {
                    pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
                    shared: true
                },
                plotOptions: {
                    column: {
                        stacking: 'percent'
                    }
                },
                series: [{
                    name: 'John',
                    data: [5, 3, 4, 7, 2]
                }, {
                        name: 'Jane',
                        data: [2, 2, 3, 2, 1]
                    }, {
                        name: 'Joe',
                        data: [3, 4, 4, 2, 5]
                    }]
            },
            optionsColumnRotatedLabel: {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Column Roated label'
                },
                subtitle: {
                    text: 'Source: <a href="http://en.wikipedia.org/wiki/List_of_cities_proper_by_population">Wikipedia</a>'
                },
                xAxis: {
                    type: 'category',
                    labels: {
                        rotation: -45,
                        style: {
                            fontSize: '13px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Population (millions)'
                    }
                },
                legend: {
                    enabled: false
                },
                tooltip: {
                    pointFormat: 'Population in 2008: <b>{point.y:.1f} millions</b>'
                },
                series: [{
                    name: 'Population',
                    data: [
                        ['Shanghai', 23.7],
                        ['Lagos', 16.1],
                        ['Istanbul', 14.2],
                        ['Karachi', 14.0],
                        ['Mumbai', 12.5],
                        ['Moscow', 12.1],
                        ['São Paulo', 11.8],
                        ['Beijing', 11.7],
                        ['Guangzhou', 11.1],
                        ['Delhi', 11.1],
                        ['Shenzhen', 10.5],
                        ['Seoul', 10.4],
                        ['Jakarta', 10.0],
                        ['Kinshasa', 9.3],
                        ['Tianjin', 9.3],
                        ['Tokyo', 9.0],
                        ['Cairo', 8.9],
                        ['Dhaka', 8.9],
                        ['Mexico City', 8.9],
                        ['Lima', 8.9]
                    ],
                    dataLabels: {
                        enabled: true,
                        rotation: -90,
                        color: '#FFFFFF',
                        align: 'right',
                        format: '{point.y:.1f}', // one decimal
                        y: 10, // 10 pixels down from the top
                        style: {
                            fontSize: '13px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }
                }]
            },
            optionsColumnDrillDown: {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Column Drilldown'
                },
                subtitle: {
                    text: 'Click the columns to view versions. Source: <a href="http://netmarketshare.com">netmarketshare.com</a>.'
                },
                xAxis: {
                    type: 'category'
                },
                yAxis: {
                    title: {
                        text: 'Total percent market share'
                    }

                },
                legend: {
                    enabled: false
                },
                plotOptions: {
                    series: {
                        borderWidth: 0,
                        dataLabels: {
                            enabled: true,
                            format: '{point.y:.1f}%'
                        }
                    }
                },

                tooltip: {
                    headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                    pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
                },

                series: [{
                    name: 'Brands',
                    colorByPoint: true,
                    data: [{
                        name: 'Microsoft Internet Explorer',
                        y: 56.33,
                        drilldown: 'Microsoft Internet Explorer'
                    }, {
                            name: 'Chrome',
                            y: 24.03,
                            drilldown: 'Chrome'
                        }, {
                            name: 'Firefox',
                            y: 10.38,
                            drilldown: 'Firefox'
                        }, {
                            name: 'Safari',
                            y: 4.77,
                            drilldown: 'Safari'
                        }, {
                            name: 'Opera',
                            y: 0.91,
                            drilldown: 'Opera'
                        }, {
                            name: 'Proprietary or Undetectable',
                            y: 0.2,
                            drilldown: null
                        }]
                }],
                drilldown: {
                    series: [{
                        name: 'Microsoft Internet Explorer',
                        id: 'Microsoft Internet Explorer',
                        data: [
                            [
                                'v11.0',
                                24.13
                            ],
                            [
                                'v8.0',
                                17.2
                            ],
                            [
                                'v9.0',
                                8.11
                            ],
                            [
                                'v10.0',
                                5.33
                            ],
                            [
                                'v6.0',
                                1.06
                            ],
                            [
                                'v7.0',
                                0.5
                            ]
                        ]
                    }, {
                            name: 'Chrome',
                            id: 'Chrome',
                            data: [
                                [
                                    'v40.0',
                                    5
                                ],
                                [
                                    'v41.0',
                                    4.32
                                ],
                                [
                                    'v42.0',
                                    3.68
                                ],
                                [
                                    'v39.0',
                                    2.96
                                ],
                                [
                                    'v36.0',
                                    2.53
                                ],
                                [
                                    'v43.0',
                                    1.45
                                ],
                                [
                                    'v31.0',
                                    1.24
                                ],
                                [
                                    'v35.0',
                                    0.85
                                ],
                                [
                                    'v38.0',
                                    0.6
                                ],
                                [
                                    'v32.0',
                                    0.55
                                ],
                                [
                                    'v37.0',
                                    0.38
                                ],
                                [
                                    'v33.0',
                                    0.19
                                ],
                                [
                                    'v34.0',
                                    0.14
                                ],
                                [
                                    'v30.0',
                                    0.14
                                ]
                            ]
                        }, {
                            name: 'Firefox',
                            id: 'Firefox',
                            data: [
                                [
                                    'v35',
                                    2.76
                                ],
                                [
                                    'v36',
                                    2.32
                                ],
                                [
                                    'v37',
                                    2.31
                                ],
                                [
                                    'v34',
                                    1.27
                                ],
                                [
                                    'v38',
                                    1.02
                                ],
                                [
                                    'v31',
                                    0.33
                                ],
                                [
                                    'v33',
                                    0.22
                                ],
                                [
                                    'v32',
                                    0.15
                                ]
                            ]
                        }, {
                            name: 'Safari',
                            id: 'Safari',
                            data: [
                                [
                                    'v8.0',
                                    2.56
                                ],
                                [
                                    'v7.1',
                                    0.77
                                ],
                                [
                                    'v5.1',
                                    0.42
                                ],
                                [
                                    'v5.0',
                                    0.3
                                ],
                                [
                                    'v6.1',
                                    0.29
                                ],
                                [
                                    'v7.0',
                                    0.26
                                ],
                                [
                                    'v6.2',
                                    0.17
                                ]
                            ]
                        }, {
                            name: 'Opera',
                            id: 'Opera',
                            data: [
                                [
                                    'v12.x',
                                    0.34
                                ],
                                [
                                    'v28',
                                    0.24
                                ],
                                [
                                    'v27',
                                    0.17
                                ],
                                [
                                    'v29',
                                    0.16
                                ]
                            ]
                        }]
                }
            },
            optionsColumnFixedPlacement: {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Column Fixed Chart'
                },
                xAxis: {
                    categories: [
                        'Seattle HQ',
                        'San Francisco',
                        'Tokyo'
                    ]
                },
                yAxis: [{
                    min: 0,
                    title: {
                        text: 'Employees'
                    }
                }, {
                        title: {
                            text: 'Profit (millions)'
                        },
                        opposite: true
                    }],
                legend: {
                    shadow: false
                },
                tooltip: {
                    shared: true
                },
                plotOptions: {
                    column: {
                        grouping: false,
                        shadow: false,
                        borderWidth: 0
                    }
                },
                series: [{
                    name: 'Employees',
                    color: 'rgba(165,170,217,1)',
                    data: [150, 73, 20],
                    pointPadding: 0.3,
                    pointPlacement: -0.2
                }, {
                        name: 'Employees Optimized',
                        color: 'rgba(126,86,134,.9)',
                        data: [140, 90, 40],
                        pointPadding: 0.4,
                        pointPlacement: -0.2
                    }, {
                        name: 'Profit',
                        color: 'rgba(248,161,63,1)',
                        data: [183.6, 178.8, 198.5],
                        tooltip: {
                            valuePrefix: '$',
                            valueSuffix: ' M'
                        },
                        pointPadding: 0.3,
                        pointPlacement: 0.2,
                        yAxis: 1
                    }, {
                        name: 'Profit Optimized',
                        color: 'rgba(186,60,61,.9)',
                        data: [203.6, 198.8, 208.5],
                        tooltip: {
                            valuePrefix: '$',
                            valueSuffix: ' M'
                        },
                        pointPadding: 0.4,
                        pointPlacement: 0.2,
                        yAxis: 1
                    }]
            },
        });
    }

    render() {
        if (!_.isEmpty(this.state.optionsBarBasic)) {
            return (
                <div>
                   <div className="row">
                        <div className="col-lg-12">
                            <h1 className="page-header">Bar Chart</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <Chart container="optionsBarBasic" options={this.state.optionsBarBasic} />
                        </div>
                        <div className="col-md-6">
                            <Chart container="optionsBarStack" options={this.state.optionsBarStack} />
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-md-6">
                            <Chart container="optionsBarNegativeStack" options={this.state.optionsBarNegativeStack} />
                        </div>
                        <div className="col-md-6">
                            <Chart container="optionsColumnBasic" options={this.state.optionsColumnBasic} />

                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-md-6">
                            <Chart container="optionsColumnNegative" options={this.state.optionsColumnNegative} />
                        </div>
                        <div className="col-md-6">
                            <Chart container="optionsColumnStack" options={this.state.optionsColumnStack} />
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-md-6">
                            <Chart container="optionsColumnStackGroup" options={this.state.optionsColumnStackGroup} />
                        </div>
                        <div className="col-md-6">
                            <Chart container="optionsColumnStackPercentage" options={this.state.optionsColumnStackPercentage} />
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-md-6">
                            <Chart container="optionsColumnRotatedLabel" options={this.state.optionsColumnRotatedLabel} />
                        </div>
                        <div className="col-md-6">
                            <Chart container="optionsColumnDrillDown" options={this.state.optionsColumnDrillDown} modules={[Drilldown,Data]}/>
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-md-6">
                            <Chart container="optionsColumnFixedPlacement" options={this.state.optionsColumnFixedPlacement} />
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

export default BarChart;