import * as types from '../actions/action-types';
import initialState from './initial-state';

export default function AppReducer(state = initialState, action) {
    var errors = [];
    switch (action.type) {
        default:
            return state;
    }
}