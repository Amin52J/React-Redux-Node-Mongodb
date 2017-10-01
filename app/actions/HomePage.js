import * as types from '../constants/ActionTypes';
import axios from 'axios';

export function test(link) {
  return dispatch => {
    axios
      .get(link)
      .then(response => {
        dispatch(dispatchTest(response));
      });
  };
}

function dispatchTest(data) {
  return {
    type: types.TEST,
    data
  };
}