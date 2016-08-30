import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Chart from './chart';
import * as _ from 'lodash';
import Highcharts from 'highcharts';
import { getChartData } from '../actions/chart-action';

class StockChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentDidMount() {
        this.props.getChartData("stock");
        this.props.getChartData("stockMultiLine");
        this.props.getChartData("stockIntraDay");
        this.setState({
            optionsStock: {
                rangeSelector: {
                    selected: 1
                },

                title: {
                    text: 'Single Line Stock'
                },
                tooltip: {
                    style: {
                        width: '200px'
                    },
                    valueDecimals: 4,
                    shared: true
                },
                series: [],
            },
            optionsMultiStockLine: {
                rangeSelector: {
                    selected: 4
                },

                title: {
                    text: 'Multi Line Stock'
                },
                yAxis: {
                    labels: {
                        formatter: function () {
                            return (this.value > 0 ? ' + ' : '') + this.value + '%';
                        }
                    },
                    plotLines: [{
                        value: 0,
                        width: 2,
                        color: 'silver'
                    }]
                },

                plotOptions: {
                    series: {
                        compare: 'percent'
                    }
                },

                tooltip: {
                    pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
                    valueDecimals: 2
                },
                series: []
            },
            optionsIntraday: {
                title: {
                    text: 'Stock Area'
                },

                subtitle: {
                    text: 'Using ordinal X axis'
                },

                xAxis: {
                    gapGridLineWidth: 0
                },

                rangeSelector: {
                    buttons: [{
                        type: 'hour',
                        count: 1,
                        text: '1h'
                    }, {
                            type: 'day',
                            count: 1,
                            text: '1D'
                        }, {
                            type: 'all',
                            count: 1,
                            text: 'All'
                        }],
                    selected: 1,
                    inputEnabled: false
                },

                series: [{
                    name: 'AAPL',
                    type: 'area',
                    data: [],
                    gapSize: 5,
                    tooltip: {
                        valueDecimals: 2
                    },
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, Highcharts.getOptions().colors[0]],
                            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                        ]
                    },
                    threshold: null
                }]
            }
        });
    }

    componentWillReceiveProps(newProps) {
        let optionsStock = this.state.optionsStock;
        optionsStock.series = newProps.stockData;
        let optionsMultiStockLine = this.state.optionsMultiStockLine;
        optionsMultiStockLine.series = newProps.stockMultiLine;
        let optionsIntraday = this.state.optionsIntraday;
        optionsIntraday.series = [{
            name: 'AAPL',
            type: 'area',
            data: newProps.stockIntraDay,
            gapSize: 5,
            tooltip: {
                valueDecimals: 2
            },
            fillColor: {
                linearGradient: {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: 1
                },
                stops: [
                    [0, Highcharts.getOptions().colors[0]],
                    [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                ]
            },
            threshold: null
        }];
        this.setState({ optionsStock: optionsStock, optionsMultiStockLine: optionsMultiStockLine, optionsIntraday: optionsIntraday });
    }

    render() {
        if (!_.isEmpty(this.state.optionsStock)) {
            return (
                <div>
                    <div className="row">
                        <div className="col-lg-12">
                            <h1 className="page-header">Stock Chart</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <Chart container="optionsStock" options={this.state.optionsStock} type="StockChart"/>
                        </div>
                        <div className="col-md-6">
                            <Chart container="optionsMultiStockLine" options={this.state.optionsMultiStockLine} type="StockChart"/>
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-md-6">
                            <Chart container="optionsIntraday" options={this.state.optionsIntraday} type="StockChart"/>
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
        stockData: state.stockData,
        stockMultiLine: state.stockMultiLine,
        stockIntraDay: state.stockIntraDay
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
)(StockChart);
