//Inheritance Inversion HOC

import * as HOCActions from '../actions/HOCAction';
import ReduxConnect from './ReduxConnect';

export default function (WrappedComponent, actions) {
  const Component = ReduxConnect(WrappedComponent, actions);
  class Enhancer extends Component {
    componentWillUnmount() {
      this.props.reset();
      if (super.componentWillUnmount) {
        super.componentWillUnmount();
      }
    }
  }
  return ReduxConnect(Enhancer, HOCActions);
}