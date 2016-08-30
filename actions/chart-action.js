import ApiUtils from '../utils/api-utils';
import * as types from './action-types';


export function getChartData(query) {
    return dispatch => {
        return ApiUtils.getChartData(query).then(results => {
            dispatch({
                type: types.HOME_BAR_DATA_RECEIVE,
                chartType:query.chartName,
                data: results.data
            });
        }).catch(error => {
            throw (error);
        });
    };
}
