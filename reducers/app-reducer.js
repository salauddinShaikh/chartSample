import * as types from '../actions/action-types';
import initialState from './initial-state';

export default function AppReducer(state = initialState, action) {
    var errors = [];
    switch (action.type) {

        case types.HOME_BAR_DATA_RECEIVE:
            switch (action.chartType) {
                case "homeBar":
                    return Object.assign([], state, {
                        homeBarData: action.data
                    });
                case "homeBarMultiple":
                    return Object.assign([], state, {
                        homeBarMultipleData: action.data
                    });
                case "homeColumn":
                    return Object.assign([], state, {
                        homeColumnData: action.data
                    });
                case "stock":
                    return Object.assign([], state, {
                        stockData: action.data
                    });
                case "stockMultiLine":
                    return Object.assign([], state, {
                        stockMultiLine: action.data
                    });
                case "stockIntraDay":
                    return Object.assign([], state, {
                        stockIntraDay: action.data
                    });
                case "lineZoom":
                    return Object.assign([], state, {
                        lineZoom: action.data
                    });
                case "lineMultiple":
                    return Object.assign([], state, {
                        lineMultiple: action.data
                    });
                case "lineSpline":
                    return Object.assign([], state, {
                        lineSpline: action.data
                    });
                case "lineSplineSymbol":
                    return Object.assign([], state, {
                        lineSplineSymbol: action.data
                    });
                case "lineLogarithmic":
                    return Object.assign([], state, {
                        lineLogarithmic: action.data
                    });
                case "pieSimple":
                    return Object.assign([], state, {
                        pieSimple: action.data
                    });
                case "pieLegend":
                    return Object.assign([], state, {
                        pieLegend: action.data
                    });
                case "pieSemiDonut":
                    return Object.assign([], state, {
                        pieSemiDonut: action.data
                    });
                case "pieDrillDown":
                    return Object.assign([], state, {
                        pieDrillDown: action.data
                    });
                case "pieGradient":
                    return Object.assign([], state, {
                        pieGradient: action.data
                    });
            }
        default:
            return state;
    }
}