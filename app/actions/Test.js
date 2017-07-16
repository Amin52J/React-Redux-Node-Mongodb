import * as types from '../constants/ActionTypes';

export function test(test) {
  return {
    type: types.TEST,
    test
  };
}