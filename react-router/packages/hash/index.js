import React, { Component } from 'react';

class HashRouter extends Component {
  state = {
    matchPath: '',
  }

  componentDidMount() {
    window.addEventListener('hashchange', (event) => {
      console.log(event);
      // 可以在newURL和oldURL的切换之间做一些hooks，来指定在路由切换前或者切换后做的事情
      const {
        newURL,
        oldURL,
      } = event;
      this.asyncMatchPath(newURL);
    });
    this.asyncMatchPath(window.location.href);
  }

  asyncMatchPath = (url) => {
    const matchPath = url.split('#')[1];
    this.setState({
      matchPath,
    });
  }

  renderChildren = children => children.map((child) => {
    // 这只是第一层route，可以做成检索所有route组件，如果有多层route，render的位置也不固定的
    const { path, component: MatchedComponent } = child.props;
    const isRoute = !!path;
    if (isRoute) {
      if (this.state.matchPath === path) {
        return <MatchedComponent />;
      }
      return false;
    }
    return child;
  })

  render() {
    const {
      props: {
        children,
      },
      renderChildren,
    } = this;
    return (
      <React.Fragment>
        {renderChildren(children)}
      </React.Fragment>
    );
  }
}

const HashRoute = () => (
  <React.Fragment />
);

export {
  HashRouter,
  HashRoute,
};
