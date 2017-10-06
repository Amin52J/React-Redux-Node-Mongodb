import * as types from '../constants/ActionTypes';

export default (combinedReducers) => {
  return (state, action) => {
    switch (action.type){
      case types.RESET:
        state = undefined;
        break
    }
    return combinedReducers(state, action);
  }
};