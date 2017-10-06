import React from 'react';
import {combineReducers, createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import * as reducers from '../../reducers';
import HOCReducer from '../../reducers/HOCReducer';
require('isomorphic-fetch');

const combinedReducers = combineReducers(reducers);
const reducer = HOCReducer(combinedReducers);
const store = createStore(reducer, applyMiddleware(thunk));

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <div>
          {this.props.children}
        </div>
      </Provider>
    );
  }
}
