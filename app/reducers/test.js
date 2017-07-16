import * as types from '../constants/ActionTypes';

const initialState = {};

export default function test(state = initialState, action) {
  switch (action.type) {
    case types.TEST:
      return state;

    default:
      return state;
  }
}
