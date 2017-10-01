import * as types from '../constants/ActionTypes';

const initialState = {
};

export default function home(state = initialState, action) {
  let newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case types.TEST:
      return newState;

    default:
      return state;
  }
}
