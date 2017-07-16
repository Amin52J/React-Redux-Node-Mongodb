import React from 'react';
import test from './test';

describe('App component', () => {
  const initialState = {
  };
  let action;

  it('test', function () {
    action = {
      type: 'TEST'
    };
    expect(test(initialState, action)).toEqual({});
  });
});