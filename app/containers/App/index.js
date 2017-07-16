import React from 'react';
import {combineReducers, createStore} from 'redux';
import { Provider } from 'react-redux';

import * as reducers from '../../reducers';

import {Test} from '../../components';

const reducer = combineReducers(reducers);
const store = createStore(reducer);

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <Test />
        </Provider>
      </div>
    );
  }
}
