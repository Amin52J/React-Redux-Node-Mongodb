import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import Test from './index';

describe("Test component", () => {

  beforeEach(function () {
    this.component = TestUtils.renderIntoDocument(<Test/>);
    this.renderedDOM = () => ReactDOM.findDOMNode(this.component);
  });

  it('renders without crashing', function () {
  });
});