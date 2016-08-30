import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Chart from './chart';
import * as _ from 'lodash';
import Funnel from 'highcharts/modules/funnel.src';
import { getChartData } from '../actions/chart-action';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            optionsBar: {}
        }
    }
    componentDidMount() {
        this.props.getChartData("homeBar");
        this.props.getChartData("homeBarMultiple");
        this.props.getChartData("homeColumn");
        this.setState({
            optionsBar: {
                chart: {
                    type: 'bar'
                },
                title: {
                    text: 'Top Users'
                },
                subtitle: {
                    text: 'past 3 days'
                },
                xAxis: {
                    categories: [
                        'Jules',
                        'Francis',
                        'Bella'
                    ]
                },
                yAxis: {
                    title: {
                        text: 'Messages Sent'
                    }
                },
                series: []
            },
            optionsBarMultiple: {
                chart: {
                    renderTo: 'container',
                    type: 'bar'
                },
                title: {
                    text: 'Top Users'
                },
                subtitle: {
                    text: 'past 3 days'
                },
                xAxis: {
                    categories: [
                        'Jules',
                        'Francis',
                        'Bella'
                    ]
                },
                yAxis: {
                    title: {
                        text: 'Messages Sent'
                    }
                },
                series: []
            },
            columnBasic: {
                chart: {
                    renderTo: 'container',
                    type: 'column'
                },
                title: {
                    text: 'Top Users'
                },
                subtitle: {
                    text: 'past 3 days'
                },
                xAxis: {
                    categories: [
                        'Jules',
                        'Francis',
                        'Bella'
                    ]
                },
                yAxis: {
                    title: {
                        text: 'Messages Sent'
                    }
                },
                series: []
            },
            optionsColumnNegative: {
                chart: {
                    renderTo: 'container',
                    type: 'column'
                },
                title: {
                    text: 'Profit Ratio by Month'
                },
                subtitle: {
                    text: 'last 12 months'
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
                    ]
                },
                yAxis: {
                    title: {
                        text: 'Profit %'
                    }
                },
                series: [{
                    data: [
                        -10, -6, -1, 2, 5, 7, 9, 12, 8, 6, 10, 7
                    ],
                    color: '#999999',
                    negativeColor: '#ef8a62',
                    fillOpacity: 0.5
                }]
            },
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
                    text: 'Profit Ratio by Month'
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
                chart: {
                    renderTo: 'container',
                    type: 'line'
                },
                title: {
                    text: 'Profit Ratio by Month'
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
                        text: 'Profit % by Sector'
                    }
                },
                series: [{
                    name: 'Tech',
                    data: [
                        -10, -6, -1, 2, 5, 7, 9, 12, 8, 6, 10, 7
                    ]
                }, {
                        name: 'Retail',
                        data: [
                            4, 2, 7, 9, 11, 13, 20, 14, 8, 9, 13, 19
                        ]
                    }
                ]
            },
            optionsAreaStack: {
                chart: {
                    renderTo: 'container',
                    type: 'area'
                },
                plotOptions: {
                    area: {
                        stacking: 'normal'
                    }
                },
                tooltip: {
                    shared: true,
                    valueSuffix: ' %'
                },
                title: {
                    text: 'Profit Ratio by Month'
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
                        3, 5, 2, 2, 5, 7, 9, 12, 8, 6, 10, 7
                    ]
                }, {
                        name: 'Tables',
                        data: [
                            4, 2, 7, 9, 11, 13, 20, 14, 8, 9, 13, 19
                        ]
                    }
                ]
            }
        });
    }

    componentWillReceiveProps(newProps) {
        debugger
        let optionsBar = this.state.optionsBar;
        optionsBar.series=[{data: newProps.homeBarData}];
        let optionsBarMultiple = this.state.optionsBarMultiple;
        optionsBarMultiple.series= newProps.homeBarMultipleData;
        let columnBasic = this.state.columnBasic;
        columnBasic.series = [{data: newProps.homeColumnData}];
        this.setState({ optionsBar: optionsBar,optionsBarMultiple:optionsBarMultiple,columnBasic:columnBasic });
    }

    render() {
        if (!_.isEmpty(this.state.optionsBar)) {
            return (
                <div>
                    <div className="row">
                        <div className="col-lg-12">
                            <h1 className="page-header">Dashboard</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <Chart container="barChart1" options={this.state.optionsBar}/>
                        </div>
                        <div className="col-md-6">
                            <Chart container="barMultiple" options={this.state.optionsBarMultiple}/>
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-md-6">
                            <Chart container="columnBasic" options={this.state.columnBasic}/>
                        </div>
                        <div className="col-md-6">
                            <Chart container="optionsColumnNegative" options={this.state.optionsColumnNegative}/>
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-md-6">
                            <Chart container="optionsLineZoom" options={this.state.optionsLineZoom}/>
                        </div>
                        <div className="col-md-6">
                            <Chart container="optionsLineMultiple" options={this.state.optionsLineMultiple}/>
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-md-6">
                            <Chart container="optionsAreaStack" options={this.state.optionsAreaStack}/>
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
        homeBarData: state.homeBarData,
        homeBarMultipleData:state.homeBarMultipleData,
        homeColumnData:state.homeColumnData,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getChartData: (chartName) => {
            dispatch(getChartData({chartName:chartName}));
        }
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);