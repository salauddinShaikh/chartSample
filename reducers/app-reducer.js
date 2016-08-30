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
            }
        default:
            return state;
    }
}