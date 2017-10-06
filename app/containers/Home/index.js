import React from 'react';
import * as actions from '../../actions/HomePage';
import {Test} from '../../components';
import {ContainerEnhancer} from '../../HOC';

class Home extends React.Component {
  render() {
    const {home: {test}} = this.props;

    return (
      <div className="home-page">
        Home Page
        <Test/>
      </div>
    );
  }
}

export default ContainerEnhancer(Home, actions);
