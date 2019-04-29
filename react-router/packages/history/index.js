import React, { Component } from 'react';

const instances = [];
const register = component => instances.push(component);
const unregister = component => instances.splice(instances.indexOf(component), 1);
class HistoryRouter extends Component {
  onClick = () => {
    console.log('clicked');
  }

  render() {
    return (
      <React.Fragment>
        {this.props.children}
      </React.Fragment>
    );
  }
}
class HistoryRoute extends Component {
  componentWillMount() {
    register(this);
  }

  componentWillUnmount() {
    unregister(this);
  }

  render() {
    const {
      path,
      component: RenderComponent,
    } = this.props;
    console.log(path, window.location.pathname);
    if (path !== window.location.pathname) {
      return false;
    }
    return (
      <RenderComponent />
    );
  }
}
// 需要Link的原因是点击链接之后需要通知HistoryRouter
class Link extends Component {
  state={
    path: '',
  }

  componentDidMount() {
    this.setState({
      path: window.location.href,
    });
  }

  onClick = () => {
    window.history.pushState(null, null, this.props.to);
    console.log(instances);
    instances.forEach(instance => instance.forceUpdate());
  }

  render() {
    return (
      <a onClick={this.onClick}>
        {this.props.children}
      </a>
    );
  }
}
export {
  HistoryRouter,
  HistoryRoute,
  Link,
};
