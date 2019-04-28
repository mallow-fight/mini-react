import React, { Component } from 'react';

const routerContext = React.createContext();

console.log(routerContext);

class HistoryRouter extends Component {
  render() {
    return (
      <React.Fragment>
        HistoryRouter
      </React.Fragment>
    );
  }
}
class HistoryRoute extends Component {
  render() {
    return (
      <React.Fragment>
        HistoryRoute
      </React.Fragment>
    );
  }
}
// 需要Link的原因是点击链接之后需要通知HistoryRouter
class Link extends Component {
  render() {
    return (
      <React.Fragment>
        {this.props.children}
      </React.Fragment>
    );
  }
}
export {
  HistoryRouter,
  HistoryRoute,
  Link,
};
