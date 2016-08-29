import ApiUtils from '../utils/api-utils';
import * as types from './action-types';

// export function loadAuthorsSuccess(authors) {
//   return {type: types.LOAD_AUTHORS_SUCCESS, authors};
// }

export function authenticate(username,password) {
  return dispatch => {
    //dispatch(beginAjaxCall());
    return ApiUtils.authenticate({userName:username,password:password}).then(results => {
        localStorage.setItem('accessToken', results.token);
        location.href = "/home";
    }).catch(error => {
      throw(error);
    });
  };
}
