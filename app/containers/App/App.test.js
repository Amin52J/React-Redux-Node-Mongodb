import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import App from './index';

describe('App component', () => {

  beforeEach(function () {
    this.component = TestUtils.renderIntoDocument(<App/>);
    this.renderedDOM = () => ReactDOM.findDOMNode(this.component);
  });

  it('renders without crashing', function () {
    expect(this.renderedDOM().tagName).toEqual('DIV');
  });
});