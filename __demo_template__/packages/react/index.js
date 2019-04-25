import getComponentType from '../share/getComponentType';

const React = {
  createElement(tag, props, ...children) {
    return {
      tag,
      props,
      children,
      type: getComponentType({ tag, props, children }),
    };
  },
};

export function Component(props) {
  this.props = props;
}

Component.prototype.setState = function setState(updater) {
  this.state = Object.assign(this.state, updater);
  // update component.
};

export default React;
