import React, { Component } from 'react';

const instance = [];
const store = {
  user: {
    name: 'mallow',
    age: 18,
  },
};

const reducers = {
  updateUser: (payload, state) => ({
    user: {
      ...state.user,
      ...payload,
    },
  }),
};

function mergeStoreToProps(props, updater) {
  const readyProps = {
    ...props,
  };
  const keys = Object.keys(updater);
  keys.forEach((key) => {
    readyProps[key] = updater[key];
  });
  return readyProps;
}

const commit = ({ type, payload }) => {
  const updater = reducers[type](payload, store);
  const updaterKeys = Object.keys(updater);
  updaterKeys.forEach((key) => {
    store[key] = updater[key];
  });
  instance.forEach((ins) => {
    const selfRender = ins.render;
    ins.render = selfRender.bind({
      ...ins,
      props: mergeStoreToProps(ins.props, updater),
    });
    ins.forceUpdate();
  });
  return store;
};

const dispatchers = {
  updateUser: ({ type, payload }) => commit({ type, payload }),
};
function connect(methods) {
  const {
    mapStateToProps,
    mapDispatcherToProps,
  } = methods;
  return function connectMethods(Target) {
    const storeProps = mapStateToProps(store);
    const dispatchersProps = mapDispatcherToProps(dispatchers);
    const dispatch = ({ type, payload }) => commit({ type, payload });
    return function wrapperProps(props) {
      const wrapperedProps = {
        ...props,
        ...storeProps,
        ...dispatchersProps,
        dispatch,
      };
      // 保留并执行原来的钩子函数
      const selfComponentWillMount = Target.prototype.componentWillMount;
      Target.prototype.componentWillMount = function componentWillMount() {
        selfComponentWillMount && selfComponentWillMount.call(this);
        instance.push(this);
      };
      return <Target {...wrapperedProps} />;
    };
  };
}

function getState(key) {
  if (!key) return store;
  return store[key];
}

// class Provider extends Component {
//   render() {
//     const {
//       children,
//     } = this.props;
//     return (
//       <React.Fragment>
//         {{
//           ...children,
//           store: {
//             getState,
//           },
//         }}
//       </React.Fragment>
//     );
//   }
// }

export {
  // Provider,
  connect,
  getState,
};
