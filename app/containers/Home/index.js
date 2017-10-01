import React from 'react';
import {connect} from 'react-redux';
import {test} from '../../actions/HomePage';
import {Test} from '../../components';

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

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, {
  test
})(Home);
